import { ClassNode, Decorator, Node } from "../lib";
import { Accessor, IFieldNode, IRelation } from "../Types";

export class FieldNode extends Node implements IFieldNode {
  private _accessors: Accessor[] = [];
  private _typeName: string;
  private _args: string;
  private _isArray: boolean;
  private _isJson: boolean;
  private _isNullable: boolean;
  private _defaultValue?: any;
  private _primary: boolean;
  private _relation: FieldNode;
  private _classNode: ClassNode;
  private _staticRelation: IRelation;

  get Accessors() {
    return this._accessors;
  }

  get TypeName() {
    return this._typeName;
  }

  get Args() {
    return this._args;
  }

  get DefaultValue() {
    return this._defaultValue;
  }

  get IsArray() {
    return this._isArray;
  }

  get IsJson() {
    return this._isJson;
  }

  get IsNullable() {
    return this._isNullable;
  }

  get Primary() {
    return this._primary;
  }

  get Relation() {
    return this._relation;
  }

  get ClassNode() {
    return this._classNode;
  }

  get StaticRelation() {
    return this._staticRelation;
  }

  static parseObjects(objs: ArrayLike<IFieldNode>, classNode: ClassNode) {
    const fieldNodes = super.genericParseObjects(FieldNode, objs);
    fieldNodes.map((fieldNode) => {
      fieldNode.SetClassNode(classNode);
    });
    return fieldNodes;
  }

  ToObject(): IFieldNode {
    const obj: IFieldNode = {
      Name: this.Name,
      Primary: this.Primary,
      IsJson: this.IsJson,
      IsArray: this.IsArray,
      TypeName: this.TypeName,
      Args: this.Args,
      Accessors: this.Accessors,
      IsNullable: this.IsNullable,
      DefaultValue: this.DefaultValue,
      Decorators: this.Decorators.map((decorator) => decorator.ToObject())
    };
    if (this._relation) {
      obj.StaticRelation = {
        ClassNodeName: this._relation.ClassNode.Name,
        FieldNodeName: this._relation.ToObject().Name,
        FieldNode: this._relation.ToObject()
      };
    }
    return obj;
  }

  ParseObject(obj: IFieldNode) {
    this
      .SetName(obj.Name)
      .SetDefaultValue(obj.DefaultValue)
      .SetType(obj.TypeName)
      .AddArgs(obj.Args)
      .AddAccessor(...obj.Accessors)
      .SetIsArray(obj.IsArray)
      .SetIsNullable(obj.IsNullable)
      .SetPrimary(obj.Primary)
      .AddDecorator(...Decorator.parseObjects(obj.Decorators))
      .SetIsJson(obj.IsJson);

    if (obj.StaticRelation) {
      this.SetStaticRelation(
        obj.StaticRelation.ClassNodeName,
        obj.StaticRelation.FieldNodeName
      );
      if (obj.StaticRelation) {
        this.StaticRelation.FieldNode = obj.StaticRelation.FieldNode;
      }
    }

    return this;
  }

  SetClassNode(classNode: ClassNode) {
    this._classNode = classNode;
    return this;
  }

  SetStaticRelation(classNodeName: string, fieldNodeName: string) {
    if (classNodeName && fieldNodeName) {
      this._staticRelation = {};
      this._staticRelation.ClassNodeName = classNodeName;
      this._staticRelation.FieldNodeName = fieldNodeName;
    }
    return this;
  }

  SetRelation(fieldNode: FieldNode) {
    this.SetStaticRelation(fieldNode.ClassNode.Name, fieldNode.Name);
    this._staticRelation.FieldNode = fieldNode.ToObject();
    this._relation = fieldNode;
    return this;
  }

  SetPrimary(isPrimary: boolean) {
    this._primary = isPrimary;
    return this;
  }

  SetType(type: string | Function) {
    this._typeName = typeof type === "string" ? type : type.name;
    return this;
  }

  AddArgs(Args: string) {
    this._args = Args;
    return this;
  }

  SetIsArray(isArray: boolean) {
    this._isArray = isArray;
    return this;
  }

  SetIsJson(isJson: boolean) {
    this._isJson = isJson
  }

  SetIsNullable(isNullable: boolean) {
    this._isNullable = isNullable;
    return this;
  }

  SetDefaultValue(defaultValue: any) {
    this._defaultValue = defaultValue;
    return this;
  }

  AddAccessor(...accessors: Accessor[]) {
    return this.addToArray(this._accessors, ...accessors);
  }

  RemoveAccessor(accessor: string) {
    return this.removeFromArray(this._accessors, accessor);
  }
}
