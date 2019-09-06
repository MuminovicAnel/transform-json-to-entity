import { INamed } from "..";
export declare abstract class Named implements INamed {
    private _name;
    constructor(name?: string);
    readonly Name: string;
    static genericParseObjects<T extends Named>(type: {
        new (): T;
    }, objs: ArrayLike<INamed>): T[];
    abstract ParseObject(obj: INamed): any;
    abstract ToObject(): any;
    SetName(name: string): this;
    protected removeFromArray(array: any[], element: any): this;
    protected addToArray<Type>(array: Type[], ...elements: Type[]): this;
}
