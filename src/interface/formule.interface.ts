import { ModificationNote } from "../common/abstract.model";

export interface IFormule {
  _id?: String;
  formule: String;
  opmerking: String;
  prijs: Number;
  is_deleted: {
    type: Boolean;
    default: false;
  };
  created_on: ModificationNote;
}
