"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Named_1 = require("./Named");
class Decorator extends Named_1.Named {
    constructor() {
        super(...arguments);
        this._arguments = [];
    }
    get Arguments() {
        return this._arguments;
    }
    static parseObjects(objs) {
        return super.genericParseObjects(Decorator, objs);
    }
    ToObject() {
        return {
            Arguments: this.Arguments,
            Name: this.Name
        };
    }
    ParseObject(obj) {
        this
            .SetName(obj.Name)
            .AddArgument(...Array.from(obj.Arguments));
        return this;
    }
    AddArgument(...args) {
        return this.addToArray(this._arguments, ...args);
    }
    RemoveArgument(argument) {
        const foundArgIndex = this._arguments.findIndex((arg) => argument === arg);
        this._arguments.splice(foundArgIndex, 1);
        return this;
    }
}
exports.Decorator = Decorator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9EZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBZ0M7QUFHaEMsTUFBYSxTQUFVLFNBQVEsYUFBSztJQUFwQzs7UUFDVSxlQUFVLEdBQVUsRUFBRSxDQUFDO0lBaUNqQyxDQUFDO0lBL0JDLElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQWdDLENBQUM7SUFDL0MsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBMkI7UUFDN0MsT0FBTyxLQUFLLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTztZQUNMLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDaEIsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBZTtRQUN6QixJQUFJO2FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7YUFDakIsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBRyxJQUFXO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGNBQWMsQ0FBQyxRQUFRO1FBQ3JCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBbENELDhCQWtDQyJ9