import Web3 from "web3";
import { METADATA_ABI } from "./constants";
import { TokenMetadataModel, ITokenMetadata } from "../models/NFTMetadata";
import { INFURA_KEY } from "../constants";

class NFTMetadata {
    mainnet = `https://mainnet.infura.io/v3/${INFURA_KEY}`;
    web3 = new Web3(new Web3.providers.HttpProvider(this.mainnet));

    async getTokenMetadata(contractAddress: string, tokenId: number): Promise<string> {
        // see if in mongo
        const meta = await this.getTokenMetadataFromDB(contractAddress, tokenId);
        let uri = meta && meta.uri;
        if (uri == null) {
            try {
                //@ts-ignore
                const contract = new this.web3.eth.Contract(METADATA_ABI, contractAddress);
                const metadataPromise = contract.methods.tokenURI(tokenId).call() as Promise<string>;
                uri = await metadataPromise;
                await this.insertTokenMetadata({contractAddress, tokenId, uri});
            } catch (err) {
                throw new Error(err);
            }
        }
        console.log(uri);
        return uri;
    }

    async getTokenMetadataFromDB(contractAddress: string, tokenId: number): Promise<ITokenMetadata> {
        try {
            const result = await TokenMetadataModel.findOne({contractAddress, tokenId});
            return result;
        } catch (err) {
            console.log("error getting token metadata: " + err);
            return null;
        }
    }

    async insertTokenMetadata(meta: ITokenMetadata): Promise<ITokenMetadata> {
        try {
            const tokenMeta = new TokenMetadataModel(meta);
            const result = await tokenMeta.save();
            return result;
        } catch (err) {
        }
    }

    async listTokenMetadata(): Promise<ITokenMetadata[]> {
        const results = await TokenMetadataModel.find();
        return results;
    }
}

export const nftMetadata = new NFTMetadata();