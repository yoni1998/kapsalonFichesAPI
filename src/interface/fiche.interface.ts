import { ModificationNote } from "../common/abstract.model";

export interface IFiche {
  _id?: String;
  naam: String;
  adres: String;
  telefoonNummer: Number;
  mobielNummer: Number;
  zakelijkNummer: Number;
  is_deleted: {
    type: Boolean;
    default: false;
  };
  created_on: ModificationNote;
}
