"use strict";

import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnectWeb3ConnectorElectron from "moralis";

import User = Moralis.User;
import Moralis from "moralis";
import Web3ProviderType = Moralis.Web3ProviderType;

const Auth = async (providerName?: Web3ProviderType | undefined) => {
  /* Moralis init code */
  const serverUrl = "https://imefijc31bnp.usemoralis.com:2053/server";
  const appId = "M62YTVf3pvP2HZvErtUHnYoc8OGwMjNQKeG03Nm4";
  await Moralis.start({ serverUrl, appId });

  const authProvider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    qrcode: false,
  });

  // if we are running live site just use web3Auth, we will swap this out if provider is passed in
  let providerString: Web3ProviderType | undefined = "walletConnectElectron";

  if (navigator.userAgent.toLowerCase().indexOf(" electron/") != -1) {
    providerString = "web3Auth";
  }

  if (providerName) {
    providerString = providerName;
  }

  let loggedInUser = Moralis.User.current();
  if (!loggedInUser) {
    await Moralis.authenticate({
      provider: providerString,
      clientId:
        "BGsNhOqrFlq09f-oX-0tnA19ZU3fUsMBQPZzUUze1gN91VuM8d6fseO65zPYSO15cmv7rAtZL9CjcsTQU8khvXo",
    })
      .then(function (user: User) {
        loggedInUser = user;
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
      })
      .catch(function (error: Error) {
        console.dir(error);
      });
  }
};

export default Auth;
