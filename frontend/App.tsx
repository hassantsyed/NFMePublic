import React, { Component, useState } from "react";
import {
  Text, Button, Alert, SafeAreaView, View
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage"
import WalletConnectProvider, {
  withWalletConnect,
  useWalletConnect
} from "@walletconnect/react-native-dapp"

import { AccountView } from "./components/AccountView";
import { logger } from "./logger";

function App(): JSX.Element {
  const connector = useWalletConnect();

  const logout = async () => {
    await connector.killSession();
    setAddress(null);
  }
  const testAccount = ""

  const [address, setAddress] = useState(null);

  if (address) {
    logger.trackEvent({
      "name": "login",
      "properties": {"address": address}
    });
    return (
      <>
        <AccountView accounts={[address]} logout={logout} key={JSON.stringify(address)}/>
      </>
    );
  } else {
    return (
        <View style={{alignItems: "center", justifyContent: "center", height: "100%", width: "100%"}}>
          <Button
            title="Connect Your Address" 
            onPress={async () => {
              console.log("trying to connect");
              const connected = await connector.connect();
              setAddress(connected.accounts[0] || null);
              console.log(connected.accounts);
            }}
          />
        </View>
    )
  }
}

export default withWalletConnect(App, {
  redirectUrl:
    "myreactdapp://",
  storageOptions: {
    //@ts-ignore
    asyncStorage: AsyncStorage,
  }
});