import extractPgSchema from 'extract-pg-schema';
const { extractSchemas } = extractPgSchema;
import rmfr from 'rmfr';

import { Config, InstantiatedConfig, PreRenderHook } from './config-types.js';
import {
  defaultGenerateIdentifierType,
  defaultGetMetadata,
  defaultGetPropertyMetadata,
  defaultPropertySortFunction,
} from './default-metadata-generators.js';
import defaultTypeMap from './defaultTypeMap.js';
import makeCompositeGenerator from './generators/makeCompositeGenerator.js';
import makeDomainsGenerator from './generators/makeDomainsGenerator.js';
import makeEnumsGenerator from './generators/makeEnumsGenerator.js';
import makeRangesGenerator from './generators/makeRangesGenerator.js';
import markAsGenerated from './hooks/markAsGenerated.js';
import Output from './Output.js';
import render from './render.js';
import TypeMap from './TypeMap.js';
import writeFile from './writeFile.js';

type Progress = {
  onProgressStart?: (total: number) => void;
  onProgress?: () => void;
  onProgressEnd?: () => void;
};

const processDatabase = async (
  config: Config,
  progress?: Progress
): Promise<void> => {
  const schemas = await extractSchemas(config.connection, {
    schemas: config.schemas,
    typeFilter: config.typeFilter,
    ...progress,
  });

  const typeMap: TypeMap = {
    ...defaultTypeMap,
    ...config.customTypeMap,
  };

  const getMetadata = config.getMetadata ?? defaultGetMetadata;
  const getPropertyMetadata =
    config.getPropertyMetadata ?? defaultGetPropertyMetadata;
  const generateIdentifierType =
    config.generateIdentifierType ?? defaultGenerateIdentifierType;
  const propertySortFunction =
    config.propertySortFunction ?? defaultPropertySortFunction;

  const instantiatedConfig: InstantiatedConfig = {
    getMetadata,
    getPropertyMetadata,
    generateIdentifierType,
    propertySortFunction,
    enumStyle: config.enumStyle ?? 'enum',
    typeMap,
    schemas,
    connection: config.connection,
    outputPath: config.outputPath ?? '.',
    preDeleteOutputFolder: config.preDeleteOutputFolder ?? false,
    resolveViews: config.resolveViews ?? true,
  };

  const generators = [
    makeCompositeGenerator('table', instantiatedConfig),
    makeCompositeGenerator('view', instantiatedConfig),
    makeCompositeGenerator('materializedView', instantiatedConfig),
    makeCompositeGenerator('compositeType', instantiatedConfig),
    makeEnumsGenerator(instantiatedConfig),
    makeRangesGenerator(instantiatedConfig),
    makeDomainsGenerator(instantiatedConfig),
  ];

  let output: Output = {};
  Object.values(schemas).forEach((schema) => {
    generators.forEach((generator) => {
      output = generator(schema, output);
    });
  });

  const preRenderHooks: PreRenderHook[] = config.preRenderHooks ?? [];
  for (const hook of preRenderHooks) {
    output = await hook(output, instantiatedConfig);
  }

  let filesToWrite = Object.keys(output).map((path) => {
    const lines = render(output[path].declarations, path);
    return { fullPath: `${path}.ts`, lines };
  });

  const postRenderHooks = config.postRenderHooks ?? [markAsGenerated];
  for (const hook of postRenderHooks) {
    filesToWrite = await Promise.all(
      filesToWrite.map(async (file) => {
        const lines = await hook(file.fullPath, file.lines, instantiatedConfig);
        return { ...file, lines };
      })
    );
  }

  if (instantiatedConfig.preDeleteOutputFolder) {
    console.info(`Clearing old files in ${instantiatedConfig.outputPath}`);
    await rmfr(instantiatedConfig.outputPath, { glob: true });
  }

  filesToWrite.forEach(writeFile);
};

export default processDatabase;
