import { ETHERSCAN_API_KEY } from "../shared/keys";
import { ETHERSCAN_API } from "./constants";
import { IEtherscanList, IEtherscanTx, IContractCreationList, IContractCreationTx } from "./Interfaces";
import { fetch } from "cross-fetch";
import { contractCreatorController } from "./ContractCreatorController";
import { nftTxController } from "./NftTxController";
interface IEtherscanTxResponse {
    blockNumber: string,
    timeStamp: string,
    hash: string,
    nonce: string,
    blockHash: string,
    from: string,
    contractAddress: string,
    to: string,
    tokenID: string,
    tokenName: string,
    tokenSymbol: string,
    tokenDecimal: string,
    transactionIndex: string,
    gas: string,
    gasPrice: string,
    gasUsed: string,
    cumulativeGasUsed: string,
    input: string,
    confirmations:string
}

interface IEtherscanListResponse {
    status: string,
    message: string,
    result: IEtherscanTxResponse[]
}

export class TxData {
    async listNftTxs(address: string): Promise<IEtherscanList> {
        const url = `${ETHERSCAN_API}?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`;
        try {
            const req = await fetch(url);
            const response = await req.json() as IEtherscanListResponse;
            if (response.status == "0" && response.message === "NOTOK") {
                throw new Error(response.message + " " + response.result);
            }
            const txs = response.result.map(tx => {
                const t = tx as any;
                t.tokenID = Number(tx.tokenID);
                return t as IEtherscanTx;
            });
            const cleanedTxs = this.removeSoldNfts(address, txs);
            const txWCreator = await Promise.all(cleanedTxs.map(async (tx) => {
                const creatorAddress = await this.getNftContractCreator(tx.contractAddress.toLowerCase());
                tx.creatorAddress = creatorAddress;
                return tx;
            }));
            this.cacheTxs(txWCreator);
            const nftTxList: IEtherscanList = {
                status: response.status,
                message: response.message,
                result: txWCreator
            }
            return nftTxList;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async getNftContractCreator(contractAddress: string): Promise<string> {
        // see if in mongo
        let creatorAddress = await contractCreatorController.getContractCreator(contractAddress)
        if (creatorAddress == null) {
            // otherwise make etherscan call...
            const url = `${ETHERSCAN_API}?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${ETHERSCAN_API_KEY}`
            const req = await fetch(url);
            const resp = await req.json() as IContractCreationList;
            if (resp.status == "1" && resp.result.length > 0) {
                const creationTx = resp.result[0];
                creatorAddress = creationTx.from.toLowerCase();
                try {
                    await contractCreatorController.insertContractCreator({contractAddress, contractCreator: creatorAddress});
                } catch (err) {
                }
            } else {
                // when throttled by etherscan, unable to determine creator.
                creatorAddress = "Pending";
            }
        }
        return creatorAddress;
    }

    removeSoldNfts(address: string, txs: IEtherscanTx[]): IEtherscanTx[] {
        const keptTokens = new Map<string, IEtherscanTx>();
        txs.map(tx => {
            const key = tx.contractAddress + "|" + tx.tokenID;
            if (tx.from.toLowerCase() === address.toLowerCase()) {
                // remove
                keptTokens.delete(tx.contractAddress+"|"+tx.tokenID);
            } else if (tx.to.toLowerCase() === address.toLowerCase()) {
                // add
                keptTokens.set(key, tx);
            }
        });
        return Array.from(keptTokens.values())

    }

    private async cacheTxs(txs: IEtherscanTx[]) {
        const uploadable = txs.filter(tx => tx.creatorAddress !== "Pending");
        await Promise.all(uploadable.map((tx => {
            nftTxController.insertNftTx(tx);
        })));
        
    }
}