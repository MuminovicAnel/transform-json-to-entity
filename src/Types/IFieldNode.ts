import { Accessor , INode, IRelation} from "..";

export interface IFieldNode extends INode {
  Accessors: Accessor[];
  TypeName: string;
  Args: Object[];
  DefaultValue: any;
  IsJson: boolean;
  IsArray: boolean;
  IsNullable: boolean;
  Primary: boolean;
  StaticRelation?: IRelation;
}
