"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const __1 = require("..");
class TSD {
    constructor() {
        this._loadedClasses = [];
        this._schemaFile = "./schema.json";
        this.Load();
    }
    get LoadedClasses() {
        return this._loadedClasses;
    }
    get TabSize() {
        return this._tabSize;
    }
    get LoadedClassesObject() {
        return this._loadedClasses.map((loadedClass) => {
            const rawLoadedClass = loadedClass.ToObject();
            delete rawLoadedClass.Path;
            return rawLoadedClass;
        });
    }
    AddLoadedClass(...classNodes) {
        this._loadedClasses = this._loadedClasses.concat(classNodes);
        return this;
    }
    Load() {
        try {
            const fileContent = fs_1.readFileSync(this._schemaFile, "utf8");
            if (fileContent) {
                const classNodes = JSON.parse(fileContent);
                this._loadedClasses = __1.ClassNode.parseObjects(classNodes);
                //Load relation
                this._loadedClasses.map((loadedClass) => {
                    loadedClass.Fields.map((field) => {
                        if (field.StaticRelation) {
                            this._loadedClasses.map((classRelation) => {
                                if (classRelation.Name === field.StaticRelation.ClassNodeName) {
                                    classRelation.Fields.map((fieldRelation) => {
                                        if (fieldRelation.Name === field.StaticRelation.FieldNodeName) {
                                            field.SetRelation(fieldRelation);
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async Write(classNode, persist = true) {
        if (classNode.Path) {
            const classExistsIndex = this._loadedClasses.findIndex((foundClassNode) => ((foundClassNode.Path === classNode.Path || foundClassNode.Name === classNode.Name) &&
                foundClassNode !== classNode) || foundClassNode === classNode);
            if (classExistsIndex > -1) {
                this._loadedClasses[classExistsIndex] = classNode;
            }
            else {
                this._loadedClasses.push(classNode);
            }
            classNode.AddImport(...this.getFieldImports(classNode));
            await this.writeFile(classNode.Path, classNode.Content);
            if (persist) {
                return await this.WriteSchemaFile();
            }
        }
        else {
            throw new Error(`Set a path to class: ${classNode.Name}`);
        }
    }
    async Remove(name) {
        const classNode = this._loadedClasses.find((loadedClass) => loadedClass.Name === name);
        if (classNode) {
            this._loadedClasses.splice(this._loadedClasses.indexOf(classNode), 1);
            this.removeFile(classNode.Path);
            this.WriteSchemaFile();
        }
        return classNode;
    }
    async WriteSchemaFile() {
        return await this.writeFile(this._schemaFile, JSON.stringify(this._loadedClasses.map((loadedClass) => loadedClass.ToObject())));
    }
    async WriteLoadedClasses() {
        const promises = this.LoadedClasses.map((loadedClass) => {
            return this.Write(loadedClass, false);
        });
        return Promise.all(promises);
    }
    SetTabSize(tabSize) {
        this._tabSize = tabSize;
        return this;
    }
    getFieldImports(classNode) {
        return classNode.Fields.reduce((prev, field) => {
            const relation = this._loadedClasses.find((loadedClass) => loadedClass.Name === field.TypeName && loadedClass.Name !== classNode.Name);
            if (relation) {
                const importPathInfos = path_1.parse(path_1.relative(path_1.dirname(classNode.Path), relation.Path));
                const dir = importPathInfos.dir;
                const importPath = `./${dir ? `${dir}/` : ""}${importPathInfos.name}`;
                const importExists = classNode.Imports.find((foundImport) => foundImport.Name === importPath);
                if (!importExists) {
                    const newImport = new __1.Import();
                    newImport
                        .SetName(importPath)
                        .AddImport([relation.Name]);
                    return [
                        ...prev,
                        newImport
                    ];
                }
            }
            return prev;
        }, []);
    }
    readFile(path) {
        return new Promise((resolve, reject) => {
            fs_1.readFile(path, "utf8", (err, content) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(content);
                }
            });
        });
    }
    writeFile(path, content) {
        return new Promise((resolve, reject) => {
            fs_1.writeFile(path, content, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(content);
                }
            });
        });
    }
    removeFile(path) {
        return new Promise((resolve, reject) => {
            fs_1.unlink(path, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(path);
                }
            });
        });
    }
}
exports.TSD = TSD;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVFNELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9UU0QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFJYztBQUNkLDJCQUtZO0FBQ1osMEJBSVk7QUFFWixNQUFhLEdBQUc7SUFxQmQ7UUFuQlEsbUJBQWMsR0FBZ0IsRUFBRSxDQUFDO1FBQ2pDLGdCQUFXLEdBQUcsZUFBZSxDQUFDO1FBbUJwQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBbEJELElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDN0MsTUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzlDLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQztZQUMzQixPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFNRCxjQUFjLENBQUMsR0FBRyxVQUF1QjtRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJO1lBQ0YsTUFBTSxXQUFXLEdBQUcsaUJBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNELElBQUksV0FBVyxFQUFFO2dCQUNmLE1BQU0sVUFBVSxHQUFpQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXpELGVBQWU7Z0JBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDdEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDL0IsSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFOzRCQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dDQUN4QyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7b0NBQzdELGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7d0NBQ3pDLElBQUksYUFBYSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRTs0Q0FDN0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQzt5Q0FDbEM7b0NBQ0gsQ0FBQyxDQUFDLENBQUM7aUNBQ0o7NEJBQ0gsQ0FBQyxDQUFDLENBQUM7eUJBQ0o7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBb0IsRUFBRSxVQUFtQixJQUFJO1FBQ3ZELElBQUksU0FBUyxDQUFDLElBQUksRUFBRTtZQUNsQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FDeEUsQ0FDRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUksSUFBSSxjQUFjLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2xGLGNBQWMsS0FBSyxTQUFTLENBQzdCLElBQUksY0FBYyxLQUFLLFNBQVMsQ0FDbEMsQ0FBQztZQUVGLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxTQUFTLENBQUM7YUFDbkQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDckM7WUFFRCxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3JDO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBWTtRQUN2QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUN2RixJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZTtRQUNuQixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FDekIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FDakYsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsa0JBQWtCO1FBQ3RCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDdEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQWU7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sZUFBZSxDQUFDLFNBQW9CO1FBQzFDLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUN4RCxXQUFXLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsSUFBSSxDQUMzRSxDQUFDO1lBQ0YsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osTUFBTSxlQUFlLEdBQUcsWUFBSyxDQUMzQixlQUFRLENBQ04sY0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFDdkIsUUFBUSxDQUFDLElBQUksQ0FDZCxDQUNGLENBQUM7Z0JBQ0YsTUFBTSxHQUFHLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQztnQkFDaEMsTUFBTSxVQUFVLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RFLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FDMUQsV0FBVyxDQUFDLElBQUksS0FBSyxVQUFVLENBQ2hDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDakIsTUFBTSxTQUFTLEdBQUcsSUFBSSxVQUFNLEVBQUUsQ0FBQztvQkFDL0IsU0FBUzt5QkFDTixPQUFPLENBQUMsVUFBVSxDQUFDO3lCQUNuQixTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFFOUIsT0FBTzt3QkFDTCxHQUFHLElBQUk7d0JBQ1AsU0FBUztxQkFDVixDQUFDO2lCQUNIO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7SUFFTyxRQUFRLENBQUMsSUFBWTtRQUMzQixPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLGFBQVEsQ0FDTixJQUFJLEVBQ0osTUFBTSxFQUNOLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFO2dCQUNmLElBQUksR0FBRyxFQUFFO29CQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2xCO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxTQUFTLENBQUMsSUFBWSxFQUFFLE9BQWU7UUFDN0MsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3QyxjQUFTLENBQ1AsSUFBSSxFQUNKLE9BQU8sRUFDUCxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNOLElBQUksR0FBRyxFQUFFO29CQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2xCO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxVQUFVLENBQUMsSUFBWTtRQUM3QixPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLFdBQU0sQ0FDSixJQUFJLEVBQ0osQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDTixJQUFJLEdBQUcsRUFBRTtvQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2I7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNmO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWhNRCxrQkFnTUMifQ==