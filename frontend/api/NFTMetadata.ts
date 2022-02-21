import Web3 from "web3";
import { IEtherscanTx, IEtherscanList, INftRandomList } from "../interfaces/Interfaces";
import { BASE_URL } from "./constants";


interface INFTMetadataRequest {
    contractAddress: string,
    tokenId: number
};

class NFTMetadata {
    public async getTokenMetadata(contractAddress: string, tokenId: number): Promise<string> {
        const reqBody: INFTMetadataRequest = {
            contractAddress,
            tokenId
        };
        try {
            const req = await fetch(`${BASE_URL}/api/nft/metadata`, {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const status = req.status;
            if (status != 500) {
                const response = await req.text();
                return response;
            } else {
                console.log("Error is retrieving metadata");
            }
        } catch (err) {
            console.log("err in retrieving meta " + err);
        }
    }

    public async listNftTxs(address: string): Promise<IEtherscanList> {
        try {
            const req = await fetch(`${BASE_URL}/api/nft/tx/${address}`);
            if (req.status == 500) {
                throw Error("Unable to get transactions");
            }
            const resp = await req.json() as IEtherscanList;
            return resp;
        } catch (err) {
            console.log("err in listing nft txs " + err);
            throw Error(err);
        }
    }

    public async getRandomNftTxs(): Promise<IEtherscanTx[]> {
        try {
            const RANDOM_AMOUNT = 20;
            const req = await fetch(`${BASE_URL}/api/nft/tx/random/${RANDOM_AMOUNT}`);
            const resp = await req.json() as INftRandomList;
            return resp.nftTxs;
        } catch (err) {
            console.log("getting feed err: " + err);
            return [];
        }
    } 
}

export const nftMetadata = new NFTMetadata();