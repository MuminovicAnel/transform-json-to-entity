"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CodeWriter_1 = require("./CodeWriter");
const __1 = require("..");
class TsCodeWriter extends CodeWriter_1.CodeWriter {
    WriteClass(classNode) {
        this.WriteDecorators(classNode.Decorators);
        this.StartBlock(`${classNode.Export.export ? "export " : ""}${classNode.Export.default ? " default" : ""}class ${classNode.Name}`);
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
    WriteImport(...imports) {
        imports.map((anImport, index) => {
            this.StartBlock("import");
            if (anImport.Imports.length > 0) {
                anImport.Imports.map((importDependency, index) => {
                    this
                        .DisableSemicolon()
                        .Write(importDependency[0])
                        .WriteCond((texts) => texts[1], __1.space `as`, importDependency[1]);
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
                .CloseBlock(`from ${__1.str `${anImport.Name}`}`);
            if (imports[index + 1]) {
                this.AddNewLine();
            }
            else {
                this.AddSpaceLine();
            }
        });
        return this;
    }
    WriteSignature(...parameters) {
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
    WriteDecorators(decorators) {
        decorators.map((decorator) => {
            this
                .NextLine.DisableSemicolon()
                .WriteCall(`@${decorator.Name}`, decorator.Arguments)
                .AddNewLine();
        });
        return this;
    }
    WriteCall(fnName, args) {
        this
            .Write(fnName)
            .StartWrap()
            .WriteJoin(...Array.from(args))
            .CloseWrap();
        return this;
    }
    WriteField(field) {
        this
            .WriteCond(() => field.Accessors.length > 0, `${field.Accessors.join(" ")} `)
            .WriteTyped(field.Name, field.TypeName, field.Args, field.IsArray, field.IsJson, field.IsNullable);
        return this;
    }
    WriteTyped(name, typeName, args, isArray, isJson, isNullable) {
        if (isJson)
            return this.Write(`${name}${isNullable ? "?" : ""}: ${args}`);
        else
            return this.Write(`${name}${isNullable ? "?" : ""}: ${typeName}${isArray ? "[]" : ""}`);
    }
}
exports.TsCodeWriter = TsCodeWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHNDb2RlV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9Uc0NvZGVXcml0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBMEM7QUFDMUMsMEJBQXlFO0FBRXpFLE1BQWEsWUFBYSxTQUFRLHVCQUFVO0lBQzFDLFVBQVUsQ0FBQyxTQUFvQjtRQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxDQUNiLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQ2xILENBQUM7UUFDRixJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDcEMsSUFBSTtxQkFDRCxlQUFlLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztxQkFDakMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVyQixJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUMvQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ25CO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJO2FBQ0QsVUFBVSxFQUFFO2FBQ1osVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBRyxPQUFpQjtRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUIsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQy9DLElBQUk7eUJBQ0QsZ0JBQWdCLEVBQUU7eUJBQ2xCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDMUIsU0FBUyxDQUNSLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ25CLFNBQUssQ0FBQSxJQUFJLEVBQ1QsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQ3BCLENBQUM7b0JBQ0osSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDL0IsSUFBSTs2QkFDRCxLQUFLLEVBQUU7NkJBQ1AsS0FBSyxDQUFDLEdBQUcsQ0FBQzs2QkFDVixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RCO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxJQUFJO2lCQUNELGdCQUFnQixFQUFFO2lCQUNsQixVQUFVLENBQUMsUUFBUSxPQUFHLENBQUEsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsY0FBYyxDQUFDLEdBQUcsVUFBOEI7UUFDOUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QixJQUFJO2lCQUNELG9CQUFvQixDQUFDLElBQUksQ0FBQztpQkFDMUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDO2lCQUN0QyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7aUJBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxlQUFlLENBQUMsVUFBdUI7UUFDckMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzNCLElBQUk7aUJBQ0QsUUFBUSxDQUFDLGdCQUFnQixFQUFFO2lCQUMzQixTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQztpQkFDcEQsVUFBVSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBYyxFQUFFLElBQW9CO1FBQzVDLElBQUk7YUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDO2FBQ2IsU0FBUyxFQUFFO2FBQ1gsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QixTQUFTLEVBQUUsQ0FBQztRQUVmLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFnQjtRQUN6QixJQUFJO2FBQ0QsU0FBUyxDQUNSLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDaEMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNoQzthQUNBLFVBQVUsQ0FDVCxLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxRQUFRLEVBQ2QsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsT0FBTyxFQUNiLEtBQUssQ0FBQyxNQUFNLEVBQ1osS0FBSyxDQUFDLFVBQVUsQ0FDakIsQ0FBQztRQUNKLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFVBQVUsQ0FDUixJQUFZLEVBQ1osUUFBZ0IsRUFDaEIsSUFBWSxFQUNaLE9BQWdCLEVBQ2hCLE1BQWUsRUFDZixVQUFtQjtRQUVuQixJQUFHLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDOztZQUV6RSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUYsQ0FBQztDQUNGO0FBdkhELG9DQXVIQyJ9