"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const Node_1 = require("./Node");
const __1 = require("..");
class ClassNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this._imports = [];
        this._fields = [];
        this._export = {
            default: false,
            export: true
        };
    }
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
        const codeWriter = new __1.TsCodeWriter();
        codeWriter
            .WriteImport(...this.Imports)
            .WriteClass(this);
        return codeWriter.Text;
    }
    static parseObjects(objs) {
        return super.genericParseObjects(ClassNode, objs);
    }
    ToObject() {
        return {
            Name: this.Name,
            Path: this.Path,
            Export: this.Export,
            Fields: this.Fields.map((field) => field.ToObject()),
            Imports: this.Imports.map((anImport) => anImport.ToObject()),
            Decorators: this.Decorators.map((decorator) => decorator.ToObject())
        };
    }
    ParseObject(obj) {
        this
            .SetExport(obj.Export)
            .SetName(obj.Name)
            .SetPath(obj.Path)
            .AddField(...__1.FieldNode.parseObjects(obj.Fields, this))
            .AddDecorator(...__1.Decorator.parseObjects(obj.Decorators))
            .AddImport(...__1.Import.parseObjects(obj.Imports));
        return this;
    }
    SetExport(exportRules) {
        this._export = exportRules;
        return this;
    }
    SetPath(path) {
        if (path) {
            this._path = path_1.normalize(path);
        }
        return this;
    }
    SetImports(imports) {
        this._imports = imports;
        return this;
    }
    AddImport(...imports) {
        return this.addToArray(this._imports, ...imports);
    }
    RemoveImport(anImport) {
        return this.removeFromArray(this._imports, anImport);
    }
    AddField(...fields) {
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
    RemoveField(field) {
        return this.removeFromArray(this._fields, field);
    }
}
exports.ClassNode = ClassNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xhc3NOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9DbGFzc05vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUM7QUFDakMsaUNBQThCO0FBQzlCLDBCQU9ZO0FBRVosTUFBYSxTQUFVLFNBQVEsV0FBSTtJQUFuQzs7UUFFVSxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLFlBQU8sR0FBZ0IsRUFBRSxDQUFDO1FBQzFCLFlBQU8sR0FBaUI7WUFDOUIsT0FBTyxFQUFFLEtBQUs7WUFDZCxNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7SUFrR0osQ0FBQztJQWhHQyxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE1BQU0sVUFBVSxHQUFHLElBQUksZ0JBQVksRUFBRSxDQUFDO1FBQ3RDLFVBQVU7YUFDUCxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQzVCLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBa0I7UUFDcEMsT0FBTyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFB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