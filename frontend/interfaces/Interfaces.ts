
export interface NftItemProps {
    nftTx: IEtherscanTx
}

export interface GalleryProps {
    nfts: IEtherscanTx[]
};

export interface IEtherscanTx {
    from: string,
    contractAddress: string,
    to: string,
    tokenID: number,
    tokenName: string,
    tokenSymbol: string,
    tokenDecimal: string,
    creatorAddress: string
}

export interface IEtherscanList {
    status: string,
    message: string,
    result: IEtherscanTx[]
}

export interface INftRandomList {
    nftTxs: IEtherscanTx[]
};

export interface INFTDisplayItem {
    supported: boolean,
    mediaItem: JSX.Element,
    build: () => Promise<void>
};

export interface IHandler {
    getMediaURI: (data: Response) => Promise<string>,
    getContent: () => any;
}