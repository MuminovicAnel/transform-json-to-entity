import { normalize } from "path";
import { Decorator, FieldNode } from "../lib";
import { IClassNode, IExportRules } from "../Types";
import { Import } from "./Import";
import { Node } from "./Node";
import { TsCodeWriter } from "./TsCodeWriter";

export class ClassNode extends Node implements IClassNode {
  private _path?: string;
  private _imports: Import[] = [];
  private _fields: FieldNode[] = [];
  private _export: IExportRules = {
    default: false,
    export: true
  };

  get Path() {
    return this._path;
  }

  get Imports() {
    return this._imports;
  }

  get Fields() {
    return this._fields;
  }

  get Export() {
    return this._export;
  }

  get Content() {
    const codeWriter = new TsCodeWriter();
    codeWriter
      .WriteImport(...this.Imports)
      .WriteClass(this);
    return codeWriter.Text;
  }

  static parseObjects(objs: IClassNode[]) {
    return super.genericParseObjects(ClassNode, objs);
  }

  ToObject(): IClassNode {
    return {
      Name: this.Name,
      Path: this.Path,
      Export: this.Export,
      Fields: this.Fields.map((field) => field.ToObject()),
      Imports: this.Imports.map((anImport) => anImport.ToObject()),
      Decorators: this.Decorators.map((decorator) => decorator.ToObject())
    };
  }

  ParseObject(obj: IClassNode) {
    this
      .SetExport(obj.Export)
      .SetName(obj.Name)
      .SetPath(obj.Path)
      .AddField(...FieldNode.parseObjects(obj.Fields, this))
      .AddDecorator(...Decorator.parseObjects(obj.Decorators))
      .AddImport(...Import.parseObjects(obj.Imports));

    return this;
  }

  SetExport(exportRules: IExportRules) {
    this._export = exportRules;
    return this;
  }

  SetPath(path?: string) {
    if (path) {
      this._path = normalize(path);
    }
    return this;
  }

  SetImports(imports: Import[]) {
    this._imports = imports;
    return this;
  }

  AddImport(...imports: Import[]) {
    return this.addToArray(this._imports, ...imports);
  }

  RemoveImport(anImport: Import) {
    return this.removeFromArray(this._imports, anImport);
  }

  AddField(...fields: FieldNode[]) {
    const newFieldArr = [
      ...this.Fields,
      ...fields
    ];
    // Filter duplicated field
    const fieldArrWithoutDup = newFieldArr.filter((field) => {
      return !newFieldArr.find((fieldDup) => {
        return field.Name === fieldDup.Name && field !== fieldDup;
      });
    });
    fieldArrWithoutDup.map((field) => {
      field.SetClassNode(this);
    });
    return this.addToArray(this._fields, ...fieldArrWithoutDup);
  }

  RemoveField(field: FieldNode) {
    return this.removeFromArray(this._fields, field);
  }
}
