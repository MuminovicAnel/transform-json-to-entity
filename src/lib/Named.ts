import { INamed } from "..";

export abstract class Named implements INamed {
  private _name: string;

  constructor(name?: string) {
    if (name) {
      this.SetName(name);
    }
  }

  get Name() {
    return this._name;
  }

  static genericParseObjects<T extends Named>(type: { new(): T }, objs: ArrayLike<INamed>): T[] {
    return (objs as Array<INamed>).map((obj) => {
      const instance = new type();
      return instance.ParseObject(obj);
    });
  }

  abstract ParseObject(obj: INamed);

  abstract ToObject();

  SetName(name: string) {
    this._name = name;
    return this;
  }

  protected removeFromArray(array: any[], element: any) {
    array.splice(
      array.indexOf(element),
      1
    );
    return this;
  }

  protected addToArray<Type>(array: Type[], ...elements: Type[]) {
    elements.map((element) => array.push(element));
    return this;
  }
}
