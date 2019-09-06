import { IDecorator } from "./IDecorator";
import { INamed } from "./INamed";

export interface INode extends INamed {
  Decorators: ArrayLike<IDecorator>;
}
