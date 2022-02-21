import mongoose from "mongoose";

export interface INftTx {
    from: string,
    contractAddress: string,
    to: string,
    tokenID: number,
    tokenName: string,
    tokenSymbol: string,
    tokenDecimal: string,
    creatorAddress: string,
    showable?: boolean
}

const nftTxSchema = new mongoose.Schema<INftTx>({
    from: String,
    contractAddress: String,
    to: String,
    tokenID: String,
    tokenName: String,
    tokenSymbol: String,
    tokenDecimal: String,
    creatorAddress: String,
    showable: Boolean
});
nftTxSchema.index({contractAddress: 1, tokenID: 1}, {unique: true});

export const NftTxModel = mongoose.model<INftTx>("NFTTx", nftTxSchema);