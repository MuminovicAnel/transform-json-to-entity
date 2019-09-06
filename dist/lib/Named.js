"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Named {
    constructor(name) {
        if (name) {
            this.SetName(name);
        }
    }
    get Name() {
        return this._name;
    }
    static genericParseObjects(type, objs) {
        return objs.map((obj) => {
            const instance = new type();
            return instance.ParseObject(obj);
        });
    }
    SetName(name) {
        this._name = name;
        return this;
    }
    removeFromArray(array, element) {
        array.splice(array.indexOf(element), 1);
        return this;
    }
    addToArray(array, ...elements) {
        elements.map((element) => array.push(element));
        return this;
    }
}
exports.Named = Named;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmFtZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL05hbWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBc0IsS0FBSztJQUd6QixZQUFZLElBQWE7UUFDdkIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTSxDQUFDLG1CQUFtQixDQUFrQixJQUFrQixFQUFFLElBQXVCO1FBQ3JGLE9BQVEsSUFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN6QyxNQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzVCLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFNRCxPQUFPLENBQUMsSUFBWTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFUyxlQUFlLENBQUMsS0FBWSxFQUFFLE9BQVk7UUFDbEQsS0FBSyxDQUFDLE1BQU0sQ0FDVixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUN0QixDQUFDLENBQ0YsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVTLFVBQVUsQ0FBTyxLQUFhLEVBQUUsR0FBRyxRQUFnQjtRQUMzRCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUF6Q0Qsc0JBeUNDIn0=