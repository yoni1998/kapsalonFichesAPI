import { sortOnDatum, sortOnNaam } from "../common/abstract.methods";
import { IFiche } from "../interface/index";
import fiche from "../model/fiche.model";

export const findAllFiches = async (sort?: any) => {
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

export const ficheOnId = async (id: any) => await fiche.findOne(id);

export const createFiche = async (newFiche: IFiche) => {
  const createdFiche = new fiche(newFiche);
  await createdFiche.save();
};

export const updateFiche = async (editFiche: IFiche) => {
  const id = { _id: editFiche._id };
  await fiche.findOneAndUpdate(id, editFiche);
};

export const deleteFiche = async (id: string) => {
  const ficheOnId = { _id: id };
  await fiche.deleteOne(ficheOnId);
};
