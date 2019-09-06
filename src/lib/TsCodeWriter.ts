import { CodeWriter } from "./CodeWriter";
import { Import, space, str, Decorator, FieldNode, ClassNode } from "..";

export class TsCodeWriter extends CodeWriter {
  WriteClass(classNode: ClassNode) {
    this.WriteDecorators(classNode.Decorators);
    this.StartBlock(
      `${classNode.Export.export ? "export " : ""}${classNode.Export.default ? " default" : ""}class ${classNode.Name}`
    );
    if (classNode.Fields.length > 0) {
      classNode.Fields.map((field, index) => {
        this
          .WriteDecorators(field.Decorators)
          .WriteField(field);

        if (classNode.Fields[index + 1]) {
          this.AddNewLine();
        }
      });
      this.WriteSemicolon();
    }
    this
      .CloseBlock()
      .AddNewLine(false);
  }

  WriteImport(...imports: Import[]) {
    imports.map((anImport, index) => {
      this.StartBlock("import");
      if (anImport.Imports.length > 0) {
        anImport.Imports.map((importDependency, index) => {
          this
            .DisableSemicolon()
            .Write(importDependency[0])
            .WriteCond(
              (texts) => texts[1],
              space`as`,
              importDependency[1]
            );
          if (anImport.Imports[index + 1]) {
            this
              .Ident()
              .Write(",")
              .AddNewLine(false);
          }
        });
      }
      this
        .DisableSemicolon()
        .CloseBlock(`from ${str`${anImport.Name}`}`);
      if (imports[index + 1]) {
        this.AddNewLine();
      } else {
        this.AddSpaceLine();
      }
    });

    return this;
  }

  WriteSignature(...parameters: [string, string][]) {
    this.StartWrap();
    parameters.map((param) => {
      this
        .SetJoinSeparatorChar(": ")
        .WriteJoin(param[0], param[1] || "any")
        .SetJoinSeparatorChar(", ")
        .Write(this._joinSeparatorChar);
    });
    return this.CloseWrap();
  }

  WriteDecorators(decorators: Decorator[]) {
    decorators.map((decorator) => {
      this
        .NextLine.DisableSemicolon()
        .WriteCall(`@${decorator.Name}`, decorator.Arguments)
        .AddNewLine();
    });

    return this;
  }

  WriteCall(fnName: string, args: ArrayLike<any>) {
    this
      .Write(fnName)
      .StartWrap()
      .WriteJoin(...Array.from(args))
      .CloseWrap();

    return this;
  }

  WriteField(field: FieldNode) {
    this
      .WriteCond(
        () => field.Accessors.length > 0,
        `${field.Accessors.join(" ")} `
      )
      .WriteTyped(
        field.Name,
        field.TypeName,
        field.Args,
        field.IsArray,
        field.IsJson,
        field.IsNullable
      );
    return this;
  }

  WriteTyped(
    name: string,
    typeName: string,
    args: string,
    isArray: boolean,
    isJson: boolean,
    isNullable: boolean
  ) {
    if(isJson) return this.Write(`${name}${isNullable ? "?" : ""}: ${args}`);
    else
    return this.Write(`${name}${isNullable ? "?" : ""}: ${typeName}${isArray ? "[]" : ""}`);
  }
}
