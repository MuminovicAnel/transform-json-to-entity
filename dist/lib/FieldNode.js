"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
const __1 = require("..");
class FieldNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this._accessors = [];
    }
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
    static parseObjects(objs, classNode) {
        const fieldNodes = super.genericParseObjects(FieldNode, objs);
        fieldNodes.map((fieldNode) => {
            fieldNode.SetClassNode(classNode);
        });
        return fieldNodes;
    }
    ToObject() {
        const obj = {
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
    ParseObject(obj) {
        this
            .SetName(obj.Name)
            .SetDefaultValue(obj.DefaultValue)
            .SetType(obj.TypeName)
            .AddArgs(obj.Args)
            .AddAccessor(...obj.Accessors)
            .SetIsArray(obj.IsArray)
            .SetIsNullable(obj.IsNullable)
            .SetPrimary(obj.Primary)
            .AddDecorator(...__1.Decorator.parseObjects(obj.Decorators))
            .SetIsJson(obj.IsJson);
        if (obj.StaticRelation) {
            this.SetStaticRelation(obj.StaticRelation.ClassNodeName, obj.StaticRelation.FieldNodeName);
            if (obj.StaticRelation) {
                this.StaticRelation.FieldNode = obj.StaticRelation.FieldNode;
            }
        }
        return this;
    }
    SetClassNode(classNode) {
        this._classNode = classNode;
        return this;
    }
    SetStaticRelation(classNodeName, fieldNodeName) {
        if (classNodeName && fieldNodeName) {
            this._staticRelation = {};
            this._staticRelation.ClassNodeName = classNodeName;
            this._staticRelation.FieldNodeName = fieldNodeName;
        }
        return this;
    }
    SetRelation(fieldNode) {
        this.SetStaticRelation(fieldNode.ClassNode.Name, fieldNode.Name);
        this._staticRelation.FieldNode = fieldNode.ToObject();
        this._relation = fieldNode;
        return this;
    }
    SetPrimary(isPrimary) {
        this._primary = isPrimary;
        return this;
    }
    SetType(type) {
        this._typeName = typeof type === "string" ? type : type.name;
        return this;
    }
    AddArgs(Args) {
        this._args = Args;
        return this;
    }
    SetIsArray(isArray) {
        this._isArray = isArray;
        return this;
    }
    SetIsJson(isJson) {
        this._isJson = isJson;
    }
    SetIsNullable(isNullable) {
        this._isNullable = isNullable;
        return this;
    }
    SetDefaultValue(defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    }
    AddAccessor(...accessors) {
        return this.addToArray(this._accessors, ...accessors);
    }
    RemoveAccessor(accessor) {
        return this.removeFromArray(this._accessors, accessor);
    }
}
exports.FieldNode = FieldNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGROb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9GaWVsZE5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBOEI7QUFDOUIsMEJBTVk7QUFFWixNQUFhLFNBQVUsU0FBUSxXQUFJO0lBQW5DOztRQUNVLGVBQVUsR0FBZSxFQUFFLENBQUM7SUErS3RDLENBQUM7SUFuS0MsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQTJCLEVBQUUsU0FBb0I7UUFDbkUsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFD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