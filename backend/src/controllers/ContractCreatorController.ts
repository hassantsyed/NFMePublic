import mongoose from "mongoose";
import { IContractCreator, ContractCreatorModel } from "../models/ContractCreator";

class ContractCreatorController {
    async getContractCreator(contract: string): Promise<string> {
        const contractCreator = await ContractCreatorModel.findOne({contractAddress: contract});
        return contractCreator && contractCreator.contractCreator;
    }

    async insertContractCreator(contract: IContractCreator): Promise<IContractCreator> {
        const contractInfo = new ContractCreatorModel(contract);
        const result = await contractInfo.save();
        return result;
    }

    async listContractCreators(): Promise<IContractCreator[]> {
        const contracts = await ContractCreatorModel.find();
        return contracts;
    }
}

export const contractCreatorController = new ContractCreatorController();