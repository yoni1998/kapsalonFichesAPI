import { IFiche } from "../interface/fiche.interface";
import fiche from "../model/fiche.model";

export default class ficheService {
  protected findAll = async () => await fiche.find();

  protected ficheOnId = async (id: any) => await fiche.findOne(id);

  protected createFiche = async (newFiche: IFiche) => {
    const createdFiche = new fiche(newFiche);
    await createdFiche.save();
  };

  protected updateFiche = async (editFiche: IFiche) => {
    const id = { _id: editFiche._id };
    await fiche.findOneAndUpdate(id, editFiche);
  };

  protected deleteFiche = async (id: String) => {
    const ficheOnId = { _id: id };
    await fiche.deleteOne(ficheOnId);
  };
}
