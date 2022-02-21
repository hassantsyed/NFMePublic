export interface IEtherscanTx {
    blockNumber: string,
    timeStamp: string,
    hash: string,
    nonce: string,
    blockHash: string,
    from: string,
    contractAddress: string,
    to: string,
    tokenID: number,
    tokenName: string,
    tokenSymbol: string,
    tokenDecimal: string,
    transactionIndex: string,
    gas: string,
    gasPrice: string,
    gasUsed: string,
    cumulativeGasUsed: string,
    input: string,
    confirmations: string,
    creatorAddress: string
}

export interface IEtherscanList {
    status: string,
    message: string,
    result: IEtherscanTx[]
}

export interface IContractCreationTx {
    from: string,
    to: string
};

export interface IContractCreationList {
    status: string,
    message: string,
    result: IContractCreationTx[]
};

