import { Declaration } from './declaration-types.js';

export type Path = string;
export type FileContents = {
  declarations: Declaration[];
};
type Output = Record<Path, FileContents>;

export default Output;
