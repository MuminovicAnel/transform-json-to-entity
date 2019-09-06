import { Named } from "./Named";
import { Decorator } from ".";
export declare abstract class Node extends Named {
    private _decorators;
    readonly Decorators: Decorator[];
    SetDecorators(decorators: Decorator[]): this;
    AddDecorator(...decorators: Decorator[]): this;
    RemoveDecorator(decorator: Decorator): this;
}
