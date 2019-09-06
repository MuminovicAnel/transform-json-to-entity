import { IDecorator, INamed } from "..";

export interface INode extends INamed {
  Decorators: ArrayLike<IDecorator>;
}
