import { IExportRules, IFieldNode, IImport, INode } from "..";

export interface IClassNode extends INode {
  Path: string;
  Imports: ArrayLike<IImport>;
  Fields: ArrayLike<IFieldNode>;
  Export: IExportRules;
  ReceivedName?: string;
}
