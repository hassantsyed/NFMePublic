import React, { Component } from "react";
import { NFTItem } from "../components/NftItem";

import {
    Text,
    Button,
    ScrollView,
    View,
    Image,
    SafeAreaView,
    Dimensions,
    ActivityIndicator,
    FlatList,
    ListRenderItemInfo
  } from "react-native";
import { GalleryProps, INFTDisplayItem } from "../interfaces/Interfaces";
import Carousel from "react-native-anchor-carousel";

interface INFTItemRender {
    item: INFTDisplayItem,
    index: number
};

export class Gallery extends Component<any, any> {
    perPage = 5;
    constructor(props: any) {
        super(props);
        this.state = {
            ready: false,
            nftItems: [],
            nftShowable: [],
            currentPage: 1,
            loading: false
        };
    }

    async componentDidMount() {
        const nftIts: INFTDisplayItem[] = this.props.nfts.map(nftTx => new NFTItem(nftTx, this.props.swapAddress));
        const showables = nftIts.slice(0, this.perPage);
        await Promise.all(showables.map(nft => nft.build()));
        const nfts = showables.filter(nft => nft.supported);
        const nftShow = nfts.map(nft => nft.mediaItem);
        console.log(nftShow.length);
        this.setState({
            nftItems: nftIts,
            ready: true,
            nftShowable: nftShow
        });
    }

    renderNft = async (item: ListRenderItemInfo<INFTDisplayItem>) => {
        const nftItem = item.item;
        await nftItem.build();
        if (nftItem.supported) {
            return nftItem.mediaItem;
        }
        return <Text>Testing</Text>

    }

    fetchNfts = async () => {
        const startIdx = this.state.currentPage * this.perPage;
        const endIdx = startIdx + this.perPage;
        const items = this.state.nftItems.slice(startIdx, endIdx);
        await Promise.all(items.map(it => it.build()));
        const showables = items.filter(item => item.supported).map(item => item.mediaItem)
        this.setState((prevState) => {
            return {nftShowable: [...prevState.nftShowable, ...showables], loading: false}
        });
        console.log(this.state.currentPage);
        console.log(this.state.nftItems.length);
    }

    onScrollHandler = async () => {
        if ((this.state.currentPage * this.perPage) > this.state.nftItems.length) {
            return;
        }
        this.setState((prevState) => {
            return {currentPage: prevState.currentPage + 1, loading: true};
        });
        await this.fetchNfts();
    }

    footerLoader = () => {
        return this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
    }

    render() {
        if (!this.state.ready) {
            return <ActivityIndicator size="large" color="#0000ff" />
        }
        return (
            <>
                <Button 
                    title={Math.min(this.state.currentPage*this.perPage, this.state.nftItems.length) + "/" + this.state.nftItems.length + " | " + this.state.nftShowable.length + " showable" } 
                    onPress={this.onScrollHandler} />
                <FlatList
                    data={this.state.nftShowable}
                    renderItem={(item) => {
                        return <View style={{justifyContent: "center", alignItems: "center"}}>{item.item}</View>
                    }}
                    ListFooterComponent={this.footerLoader}
                    initialNumToRender={this.perPage}
                    onEndReached={this.onScrollHandler}
                    onEndReachedThreshold={2}
                />
            </>
        );
    }
}
