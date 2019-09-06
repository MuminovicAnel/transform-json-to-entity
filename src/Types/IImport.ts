import { INamed } from "..";

export interface IImport extends INamed {
  Imports: ArrayLike<[string, string | undefined]>;
  Default?: string;
}
