import React, { Component } from "react";
import { nftMetadata } from "../api/NFTMetadata";
import { Gallery } from "../components/Gallery";

import {
    Text, Button, ActivityIndicator
} from "react-native";

export class FeedView extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            txDone: false,
            nftTxs: []
        };
    }

    componentDidMount() {
        this.getNftFeed();
    }

    async getNftFeed() {
        try {
            const txs = await nftMetadata.getRandomNftTxs();
            this.setState({
                nftTxs: txs,
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
                    <Text>Sorry! We're out of NFTs :(</Text>
                </>
            )
        } else {
            return (
                <>
                    <Gallery nfts={this.state.nftTxs} swapAddress={this.props.swapAddress}/>
                </>
            )
        }
        
    }
}


