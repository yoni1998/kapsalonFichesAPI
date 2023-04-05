import * as mongoose from "mongoose";
import { ModificationNote } from "../common/abstract.model";

export const schema = new mongoose.Schema({
  formule: String,
  opmerking: String,
  prijs: Number,
  created_on: ModificationNote,
});

export default mongoose.model("formule", schema);