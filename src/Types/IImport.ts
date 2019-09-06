import { INamed } from "./INamed";

export interface IImport extends INamed {
  Imports: ArrayLike<[string, string | undefined]>;
  Default?: string;
}
