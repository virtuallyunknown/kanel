import { TableColumn, TableDetails } from 'extract-pg-schema';

import { InstantiatedConfig } from './config-types.js';
import { TypeDeclaration } from './declaration-types.js';
import Details from './Details.js';
import {
  CompositeDetails,
  CompositeProperty,
} from './generators/composite-types.js';
import TypeDefinition from './TypeDefinition.js';

export type TypeMetadata = {
  name: string;
  comment: string[] | undefined;
  path: string;
};

export type GetMetadata = (
  details: Details,
  generateFor: 'selector' | 'initializer' | 'mutator' | undefined,
  instantiatedConfig: InstantiatedConfig
) => TypeMetadata;

export type PropertyMetadata = {
  name: string;
  comment: string[] | undefined;
  typeOverride?: TypeDefinition;
  nullableOverride?: boolean;
  optionalOverride?: boolean;
};

export type GetPropertyMetadata = (
  property: CompositeProperty,
  details: CompositeDetails,
  generateFor: 'selector' | 'initializer' | 'mutator',
  instantiatedConfig: InstantiatedConfig
) => PropertyMetadata;

export type GenerateIdentifierType = (
  column: TableColumn,
  details: TableDetails,
  instantiatedConfig: InstantiatedConfig
) => TypeDeclaration;
