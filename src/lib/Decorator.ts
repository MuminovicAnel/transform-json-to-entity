import { Named } from "./Named";
import { IDecorator } from "..";

export class Decorator extends Named implements IDecorator {
  private _arguments: any[] = [];

  get Arguments() {
    return this._arguments as ReadonlyArray<any>;
  }

  static parseObjects(objs: ArrayLike<IDecorator>) {
    return super.genericParseObjects(Decorator, objs);
  }

  ToObject(): IDecorator {
    return {
      Arguments: this.Arguments,
      Name: this.Name
    };
  }

  ParseObject(obj: IDecorator) {
    this
      .SetName(obj.Name)
      .AddArgument(...Array.from(obj.Arguments));
    return this;
  }

  AddArgument(...args: any[]) {
    return this.addToArray(this._arguments, ...args);
  }

  RemoveArgument(argument) {
    const foundArgIndex = this._arguments.findIndex((arg) => argument === arg);
    this._arguments.splice(foundArgIndex, 1);
    return this;
  }
}
