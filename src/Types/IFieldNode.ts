import { Accessor } from "./Accessor";
import { INode } from "./INode";
import { IRelation } from "./IRelation";

export interface IFieldNode extends INode {
  Accessors: Accessor[];
  TypeName: string;
  Args: string;
  DefaultValue: any;
  IsJson: boolean;
  IsArray: boolean;
  IsNullable: boolean;
  Primary: boolean;
  StaticRelation?: IRelation;
}
