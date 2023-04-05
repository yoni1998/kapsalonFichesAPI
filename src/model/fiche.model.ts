import * as mongoose from "mongoose";
import { ModificationNote } from "../common/abstract.model";

const schema = new mongoose.Schema({
  naam: String,
  adres: String,
  telefoonNummer: Number,
  mobielNummer: Number,
  zakelijkNummer: Number,
  is_deleted: {
    type: Boolean,
    default: false,
  },
  created_on: ModificationNote,
});

export default mongoose.model("fiche", schema);
