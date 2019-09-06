import {
  INamed,
  IDecorator
} from "..";

export interface INode extends INamed {
  Decorators: ArrayLike<IDecorator>;
}
