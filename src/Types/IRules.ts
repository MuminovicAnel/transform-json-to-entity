import {
  IExportRules,
  IImport
} from "..";
import { Decorator } from "../lib/Decorator";

export interface IRules {
  exportRules: IExportRules;
  imports: IImport[];
  classDecorators: Decorator[];
  fieldDecorators: Decorator[];
}
