import { INftTx, NftTxModel } from "../models/NFTTxs";

class NftTxController {
    // TODO: upsert
    async insertNftTx(nftTx: INftTx): Promise<INftTx> {
        try {
            const nft = new NftTxModel(nftTx);
            const result = await nft.save();
            return result;
        } catch (err) {
            console.log("insertNftTx " + err);
        }
    }

    async getRandomNftTxs(amount: number): Promise<INftTx[]> {
        const results = NftTxModel.aggregate([{$sample: {size: amount}}]);
        return results;
    }

    async listNftTx(): Promise<INftTx[]> {
        const nftTxs = await NftTxModel.find();
        return nftTxs;
    }

    //TODO
    async deleteNftTx(contractAddress: string, tokenId: number): Promise<void> {
        return null;
    }
}

export const nftTxController = new NftTxController();