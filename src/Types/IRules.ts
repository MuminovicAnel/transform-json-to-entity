import { Decorator, IExportRules, IImport } from "..";

export interface IRules {
  exportRules: IExportRules;
  imports: IImport[];
  classDecorators: Decorator[];
  fieldDecorators: Decorator[];
}
