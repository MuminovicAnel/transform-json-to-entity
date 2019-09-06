"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Named_1 = require("./Named");
class Import extends Named_1.Named {
    constructor() {
        super(...arguments);
        this._imports = [];
    }
    get Imports() {
        return this._imports;
    }
    get Default() {
        return this._default;
    }
    static parseObjects(objs) {
        return this.genericParseObjects(Import, objs);
    }
    ToObject() {
        return {
            Default: this.Default,
            Name: this.Name,
            Imports: this.Imports
        };
    }
    ParseObject(obj) {
        this
            .SetDefault(obj.Default)
            .SetName(obj.Name)
            .AddImport(...obj.Imports);
        return this;
    }
    AddImport(...importInfos) {
        return this.addToArray(this._imports, ...importInfos);
    }
    SetDefault(importAs) {
        if (importAs) {
            this._default = importAs;
        }
        return this;
    }
}
exports.Import = Import;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1wb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9JbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtQ0FBZ0M7QUFFaEMsTUFBYSxNQUFPLFNBQVEsYUFBSztJQUFqQzs7UUFFVSxhQUFRLEdBQW1DLEVBQUUsQ0FBQztJQXlDeEQsQ0FBQztJQXZDQyxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUF1RCxDQUFDO0lBQ3RFLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBd0I7UUFDMUMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBVztRQUNyQixJQUFJO2FBQ0QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7YUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7YUFDakIsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFHLFdBQWdDO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxRQUFnQjtRQUN6QixJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUEzQ0Qsd0JBMkNDIn0=