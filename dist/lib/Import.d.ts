import { IImport } from "..";
import { Named } from "./Named";
export declare class Import extends Named implements IImport {
    private _default?;
    private _imports;
    readonly Imports: readonly [string, string][];
    readonly Default: string;
    static parseObjects(objs: ArrayLike<IImport>): Import[];
    ToObject(): IImport;
    ParseObject(obj: Import): this;
    AddImport(...importInfos: [string, string?][]): this;
    SetDefault(importAs: string): this;
}
