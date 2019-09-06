import { Decorator } from "../lib";
import { IExportRules } from "./IExportRules";
import { IImport } from "./IImport";

export interface IRules {
  exportRules: IExportRules;
  imports: IImport[];
  classDecorators: Decorator[];
  fieldDecorators: Decorator[];
}
