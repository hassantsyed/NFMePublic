import mongoose from "mongoose";

export interface INFTMetadataRequestBody {
    contractAddress: string,
    tokenId: number;
};

export interface ITokenMetadata {
    contractAddress: string,
    tokenId: number,
    uri: string
};

const tokenMetadataSchema = new mongoose.Schema<ITokenMetadata>({
    contractAddress: String,
    tokenId: Number,
    uri: String
});
tokenMetadataSchema.index({contractAddress: 1, tokenId: 1}, {unique: true});

export const TokenMetadataModel = mongoose.model<ITokenMetadata>("TokenMetadata", tokenMetadataSchema);