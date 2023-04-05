import { ModificationNote } from "../common/abstract.model";

export interface IFormule {
  _id?: String;
  formule: String;
  opmerking: String;
  prijs: Number;
  created_on: ModificationNote;
}
