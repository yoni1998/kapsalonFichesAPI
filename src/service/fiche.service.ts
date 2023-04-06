import { sortOnDatum, sortOnNaam } from "../common/abstract.methods";
import { IFiche } from "../interface/fiche.interface";
import fiche from "../model/fiche.model";

export default class ficheService {
  protected findAll = async (sort?: any) => {
    if (sort === "naam") {
      const result = await fiche.find();
      return sortOnNaam(result);
    } else if (sort === "datum") {
      const result = await fiche.find();
      return sortOnDatum(result);
    } else {
      return await fiche.find();
    }
  };
  protected ficheOnId = async (id: any) => await fiche.findOne(id);

  protected createFiche = async (newFiche: IFiche) => {
    const createdFiche = new fiche(newFiche);
    await createdFiche.save();
  };

  protected updateFiche = async (editFiche: IFiche) => {
    const id = { _id: editFiche._id };
    await fiche.findOneAndUpdate(id, editFiche);
  };

  protected deleteFiche = async (id: string) => {
    const ficheOnId = { _id: id };
    await fiche.deleteOne(ficheOnId);
  };
}
