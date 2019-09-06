"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Named_1 = require("./Named");
class Node extends Named_1.Named {
    constructor() {
        super(...arguments);
        this._decorators = [];
    }
    get Decorators() {
        return this._decorators;
    }
    SetDecorators(decorators) {
        this._decorators = decorators;
        return this;
    }
    AddDecorator(...decorators) {
        return this.addToArray(this.Decorators, ...decorators);
    }
    RemoveDecorator(decorator) {
        return this.removeFromArray(this.Decorators, decorator);
    }
}
exports.Node = Node;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFnQztBQUdoQyxNQUFzQixJQUFLLFNBQVEsYUFBSztJQUF4Qzs7UUFDVSxnQkFBVyxHQUFnQixFQUFFLENBQUM7SUFrQnhDLENBQUM7SUFoQkMsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBdUI7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsWUFBWSxDQUFDLEdBQUcsVUFBdUI7UUFDckMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxVQUFVLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsZUFBZSxDQUFDLFNBQW9CO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDRjtBQW5CRCxvQkFtQkMifQ==