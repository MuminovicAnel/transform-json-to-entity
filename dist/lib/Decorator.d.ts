import { Named } from "./Named";
import { IDecorator } from "..";
export declare class Decorator extends Named implements IDecorator {
    private _arguments;
    readonly Arguments: readonly any[];
    static parseObjects(objs: ArrayLike<IDecorator>): Decorator[];
    ToObject(): IDecorator;
    ParseObject(obj: IDecorator): this;
    AddArgument(...args: any[]): this;
    RemoveArgument(argument: any): this;
}
