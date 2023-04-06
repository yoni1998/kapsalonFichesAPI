import { IFormule } from "./../interface/formule.interface";
import formule from "../model/formule.model";
import { sortOnDatum } from "../common/abstract.methods";

export default class formuleService {
  protected findAll = async () => {
    const result = await formule.find();
    return sortOnDatum(result);
  };

  protected formuleOnId = async (id: any) => await formule.findOne(id);

  protected createFormule = async (newFormule: IFormule) => {
    const createdFormule = new formule(newFormule);
    await createdFormule.save();
  };

  protected updateFormule = async (editFormule: IFormule) => {
    const id = { _id: editFormule._id };
    await formule.findOneAndUpdate(id, editFormule);
  };

  protected deleteFormule = async (id: string) => {
    const formuleOnId = { _id: id };
    await formule.deleteOne(formuleOnId);
  };
}
