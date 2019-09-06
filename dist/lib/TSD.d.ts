import { ClassNode, IClassNode } from "..";
export declare class TSD {
    private _tabSize;
    private _loadedClasses;
    private _schemaFile;
    readonly LoadedClasses: ClassNode[];
    readonly TabSize: number;
    readonly LoadedClassesObject: IClassNode[];
    constructor();
    AddLoadedClass(...classNodes: ClassNode[]): this;
    Load(): void;
    Write(classNode: ClassNode, persist?: boolean): Promise<string>;
    Remove(name: string): Promise<ClassNode>;
    WriteSchemaFile(): Promise<string>;
    WriteLoadedClasses(): Promise<string[]>;
    SetTabSize(tabSize: number): this;
    private getFieldImports;
    private readFile;
    private writeFile;
    private removeFile;
}
