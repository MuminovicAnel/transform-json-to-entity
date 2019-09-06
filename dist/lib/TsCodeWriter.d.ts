import { CodeWriter } from "./CodeWriter";
import { Import, Decorator, FieldNode, ClassNode } from "..";
export declare class TsCodeWriter extends CodeWriter {
    WriteClass(classNode: ClassNode): void;
    WriteImport(...imports: Import[]): this;
    WriteSignature(...parameters: [string, string][]): this;
    WriteDecorators(decorators: Decorator[]): this;
    WriteCall(fnName: string, args: ArrayLike<any>): this;
    WriteField(field: FieldNode): this;
    WriteTyped(name: string, typeName: string, args: string, isArray: boolean, isJson: boolean, isNullable: boolean): this;
}
