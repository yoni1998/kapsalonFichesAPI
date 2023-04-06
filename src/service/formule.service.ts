import { IFormule } from "./../interface/formule.interface";
import formule from "../model/formule.model";
import { sortOnDatum } from "../common/abstract.methods";

export const findAllFormules = async () => {
  const result = await formule.find();
  return sortOnDatum(result);
};

export const formuleOnId = async (id: any) => await formule.findOne(id);

export const createFormule = async (newFormule: IFormule) => {
  const createdFormule = new formule(newFormule);
  await createdFormule.save();
};

export const updateFormule = async (editFormule: IFormule) => {
  const id = { _id: editFormule._id };
  await formule.findOneAndUpdate(id, editFormule);
};

export const deleteFormule = async (id: string) => {
  const formuleOnId = { _id: id };
  await formule.deleteOne(formuleOnId);
};
