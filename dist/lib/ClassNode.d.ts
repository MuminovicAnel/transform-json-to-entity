import { Node } from "./Node";
import { FieldNode, Import, IClassNode, IExportRules } from "..";
export declare class ClassNode extends Node implements IClassNode {
    private _path?;
    private _imports;
    private _fields;
    private _export;
    readonly Path: string;
    readonly Imports: Import[];
    readonly Fields: FieldNode[];
    readonly Export: IExportRules;
    readonly Content: string;
    static parseObjects(objs: IClassNode[]): ClassNode[];
    ToObject(): IClassNode;
    ParseObject(obj: IClassNode): this;
    SetExport(exportRules: IExportRules): this;
    SetPath(path?: string): this;
    SetImports(imports: Import[]): this;
    AddImport(...imports: Import[]): this;
    RemoveImport(anImport: Import): this;
    AddField(...fields: FieldNode[]): this;
    RemoveField(field: FieldNode): this;
}
