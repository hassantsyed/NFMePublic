import React, { Component } from "react";

import {
    Text,
    SafeAreaView,
} from "react-native";
import { Appbar, BottomNavigation } from "react-native-paper";
import { GalleryView } from "./GalleryView";
import { FeedView } from "./FeedView";

export class AccountView extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state= {
            random: 0,
            index: 2,
            mainAccounts: props.accounts,
            accounts: props.accounts,
            routes: [
                {key: 'feed', icon: 'filter-variant'},
                {key: 'people', icon: 'robot'},
                {key: 'home', icon: 'home'}
            ]
        };
    }

    swapAccount = (address: string) => {
        if (address === this.state.mainAccounts[0]) {
            this.setState({index: 2})
        } else {
            this.setState({accounts: [address], index: 1});
        }
    }

    //hitting random eveyr time, when doing index 0 only get random

    HomeRoute = () => <GalleryView accounts={this.state.mainAccounts} swapAddress={this.swapAccount} key={this.state.mainAccounts[0]}/>;
    FeedRoute = () => <FeedView swapAddress={this.swapAccount} key={this.state.random}/>
    PeopleRoute = () => <GalleryView accounts={this.state.accounts} swapAddress={this.swapAccount} key={this.state.accounts[0]}/>;

    renderScene = BottomNavigation.SceneMap({
        people: this.PeopleRoute,
        feed: this.FeedRoute,
        home: this.HomeRoute
    });

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Appbar style={{backgroundColor: "lightblue"}}>
                    <Text>{this.state.mainAccounts[0]}</Text>
                    <Appbar.Action icon="logout" onPress={this.props.logout} />
                </Appbar>
                <GalleryView accounts={this.state.accounts} swapAddress={this.swapAccount} key={this.state.accounts[0]}/>
                <BottomNavigation 
                    navigationState={{ index: this.state.index, routes: this.state.routes}}
                    onIndexChange={(idx) => {
                        if (idx === 0) {
                            this.setState({random: Math.random()});
                        }
                        this.setState({index: idx})
                    }}
                    renderScene={this.renderScene}
                />
            </SafeAreaView>
        )
    }
}
