import { IExportRules } from "./IExportRules";
import { IFieldNode } from "./IFieldNode";
import { IImport } from "./IImport";
import { INode } from "./INode";

export interface IClassNode extends INode {
  Path: string;
  Imports: ArrayLike<IImport>;
  Fields: ArrayLike<IFieldNode>;
  Export: IExportRules;
  ReceivedName?: string;
}
