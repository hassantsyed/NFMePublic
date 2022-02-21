import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { nftMetadata } from "../controllers/NFTMetadata";

import { TxData } from "../controllers/TxData";
import { INFTMetadataRequestBody } from 'src/models/NFTMetadata';
import { contractCreatorController } from "../controllers/ContractCreatorController";
import { nftTxController } from "../controllers/NftTxController";

import { telemClient } from "../Server";

const txData = new TxData();

const { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } = StatusCodes;


export async function getNftMetadata(req: Request<{}, {}, INFTMetadataRequestBody>, res: Response) {
    try {
        const { contractAddress, tokenId } = req.body;
        if (contractAddress && tokenId) {
            const metadata = await nftMetadata.getTokenMetadata(contractAddress.toLowerCase(), tokenId)
            return res.status(OK).send(metadata);
        }
        console.log("!!")
        return res.status(BAD_REQUEST).end();
    } catch (err) {
        console.log("in catch")
        return res.status(INTERNAL_SERVER_ERROR).json({"error": err});
    }
}

export async function liftNftMetadata(req: Request, resp: Response) {
    console.log("!!!!");
    telemClient.trackTrace({message: "testing"});
    const metadata = await nftMetadata.listTokenMetadata();
    return resp.status(OK).json(metadata);
}

export async function getNftTxs(req: Request, res: Response) {
    try {
        const { address } = req.params;
        const nftTxs = await txData.listNftTxs(address);
        return res.status(OK).json(nftTxs);
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({"error": err});
    }
}

export async function listCreators(req: Request, res: Response) {
    const results = await contractCreatorController.listContractCreators();
    return res.status(OK).json({creators: results});
}

export async function listAllTxs(req: Request, res: Response) {
    const results = await nftTxController.listNftTx();
    return res.status(OK).json({nftTxs: results});
}

export async function getRandomNftTxs(req: Request, resp: Response) {
    const { amount } = req.params;
    const amountTyped = Number(amount);
    const results = await nftTxController.getRandomNftTxs(amountTyped);
    return resp.status(OK).json({nftTxs: results});
}