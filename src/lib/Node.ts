import { Named } from "./Named";
import { Decorator } from ".";

export abstract class Node extends Named {
  private _decorators: Decorator[] = [];

  get Decorators() {
    return this._decorators;
  }

  SetDecorators(decorators: Decorator[]) {
    this._decorators = decorators;
    return this;
  }

  AddDecorator(...decorators: Decorator[]) {
    return this.addToArray(this.Decorators, ...decorators);
  }

  RemoveDecorator(decorator: Decorator) {
    return this.removeFromArray(this.Decorators, decorator);
  }
}
