import React, { Component } from "react";
import { nftMetadata } from "../api/NFTMetadata";
import { IEtherscanTx, INFTDisplayItem } from "../interfaces/Interfaces";
import { ContentHandler } from "../handlers/ContentHandler";
import { MediaContainer } from "./MediaContainer";
import { logger } from "../logger";

export class NFTItem implements INFTDisplayItem {
    supported: boolean;
    mediaItem: JSX.Element;
    private swapper: (address: string) => void;

    tx: IEtherscanTx;
    constructor(tx: IEtherscanTx, swapper: (address: string) => void) {
        this.tx = tx;
        this.swapper = swapper;
    }

    public async build() {
        try {
            let metadataUrl = await nftMetadata.getTokenMetadata(this.tx.contractAddress, this.tx.tokenID);
            metadataUrl = this.urlCheck(metadataUrl);
            console.log("metadata url: " + metadataUrl);
            const metadataReq = await Promise.race<Promise<Response | Error>>([
                fetch(metadataUrl),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout fetching metadata ' + metadataUrl)), 3000))
                ]
            );
            if (metadataReq instanceof Error) {
                console.log("fetching metadata at: " + metadataUrl + " timed out");
                throw metadataReq;
            }
            console.log("finished metadata for : " + metadataUrl)
            const contentType = metadataReq.headers.get("Content-Type");
            console.log(metadataUrl + " " + contentType);
            const handler = new ContentHandler().getHandler(contentType);

            let mediaUri = await handler.getMediaURI(metadataReq);
            const content = await handler.getContent();
            console.log("media uri: " + mediaUri);

            mediaUri = this.urlCheck(mediaUri);

            

            const mediaReq = await Promise.race<Promise<Response | Error>>([
                fetch(mediaUri),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout fetching media ' + mediaUri)), 3000))
                ]
            )
            if (mediaReq instanceof Error) {
                console.log("fetching media at: " + mediaUri + " timed out");
                throw mediaReq;
            }

            const mediaType = mediaReq.headers.get("Content-Type").toLowerCase();
            console.log(mediaUri + " " + mediaType);
            if (this.isMediaSupported(mediaType)) {
                this.mediaItem = <MediaContainer 
                                    mediaUri={mediaUri} 
                                    mediaType={mediaType} 
                                    key={this.tx.contractAddress+""+this.tx.tokenID}
                                    owner={this.tx.to}
                                    creator={this.tx.creatorAddress}
                                    swapper={this.swapper}
                                    loadedContent={content}
                                />
                this.supported = true;
            } else {
                logger.trackEvent({"name": "contentTypeInvalid",
                    "properties": {
                        "contentType": mediaType,
                        "mediaUri": mediaUri
                    }
                });
                throw new Error("MediaType " + mediaType + " is unsupported " + mediaUri);
            }
        } catch (err) {
            logger.trackEvent({"name": "renderError", "properties": {
                "error": err
            }});
            console.log("NFTItem err: " + err);
            this.supported = false;
        }
    }

    private isMediaSupported(mediaType: string): boolean {
        const supportedTypes = ["image/png", "image/jpeg", "image/gif", "image/svg+xml", "text/plain; charset=utf-8"]
        return supportedTypes.includes(mediaType);
    }

    private urlCheck(mediaUri: string): string { 
        if (mediaUri.startsWith("ipfs")) {
            const endLoc = mediaUri.split("//");
            if (endLoc.length === 2) {
                const ipfsFullUri = `https://ipfs.io/ipfs/${endLoc[1]}`;
                return ipfsFullUri;
            }
        }
            return mediaUri;
    }
}