import React, { Component, useState, useEffect } from "react";

import {
    Text,
    Button,
    View,
    Image,
    Dimensions
  } from "react-native";
import { SvgUri } from "react-native-svg";
import { Card } from "react-native-paper";


export function MediaContainer(props: any) {

    const mediaWidth = Dimensions.get("window").width * (7/8)
    const cardHeight = Dimensions.get("window").height * (2/4)
    
    const imageTypes = ["image/png", "image/jpeg", "image/gif"]

    let media = null;
    if (props.mediaType === "image/svg+xml") {
        media = <SvgUri
                    width={"100%"}
                    height={"100%"}
                    uri={props.mediaUri}
                    preserveAspectRatio="xMinYMin slice"
                    viewBox={"0 0 600 600"}
            />
    } else if (imageTypes.includes(props.mediaType)) {
        media = <Image 
                    style={{flex: 1, width: null, height: null, resizeMode: "contain"}}
                    source={{uri: props.mediaUri}}
                />
    } else if (props.mediaType === "text/plain; charset=utf-8" && props.loadedContent !== null) {
        media = <Text>{props.loadedContent}</Text>
    } else {
        media = <Text>Unsupported</Text>
    }
    return (
        <View
            style={{
                paddingBottom: 20,
            }}
        >
            <Card style={{width: mediaWidth, height: props.mediaType === "text/plain; charset=utf-8" ? null : cardHeight}}>
                <Button title={"Owner: " + props.owner} onPress={()=>{
                    props.swapper(props.owner);
                }}/>
                {media}
                <Button title={"Creator: " + props.creator} onPress={()=>{
                        props.swapper(props.creator);
                    }}
                    disabled={props.creator.toLowerCase() === "pending"}
                />
            </Card>
        </View>
    );
}