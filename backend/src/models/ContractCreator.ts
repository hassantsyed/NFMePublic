import mongoose from "mongoose";

export interface IContractCreator {
    contractAddress: string,
    contractCreator: string
};

const contractCreatorSchema = new mongoose.Schema<IContractCreator>({
    contractAddress: {type: String, unique: true},
    contractCreator: String
});

export const ContractCreatorModel = mongoose.model<IContractCreator>("ContractCreator", contractCreatorSchema);