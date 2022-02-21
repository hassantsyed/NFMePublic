import React, { Component } from "react";
import { nftMetadata } from "../api/NFTMetadata";
import { Gallery } from "../components/Gallery";

import {
    Text, Button, ActivityIndicator
} from "react-native";

export class GalleryView extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            txDone: false,
            accounts: props.accounts,
            nftTxs: []
        };
    }

    componentDidMount() {
        this.getNftTxs();
    }

    async getNftTxs() {
        try {
            const txs = await nftMetadata.listNftTxs(this.state.accounts[0]);
            this.setState({
                nftTxs: txs.result,
                txDone: true
            });
        } catch (err) {
            this.setState({nftTxs: [], txDone: true});
        }
    }

    render() {
        if (!this.state.txDone) {
            return <ActivityIndicator size="large" color="#0000ff" />
        }
        if (this.state.nftTxs.length === 0 && this.state.txDone) {
            return (
                <>
                    <Text>This address does not own any NFTs.</Text>
                </>
            )
        } else {
            return (
                <>
                    <Text>{this.state.accounts[0]}</Text>
                    <Gallery nfts={this.state.nftTxs} swapAddress={this.props.swapAddress}/>
                </>
            )
        }
        
    }
}


