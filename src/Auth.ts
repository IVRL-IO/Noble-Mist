"use strict";
import Web3 from "web3";

import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnectWeb3ConnectorElectron from "moralis";

import User = Moralis.User;
import Moralis from "moralis";

const Auth = async () => {
  /* Moralis init code */
  const serverUrl = "https://imefijc31bnp.usemoralis.com:2053/server";
  const appId = "M62YTVf3pvP2HZvErtUHnYoc8OGwMjNQKeG03Nm4";
  await Moralis.start({serverUrl, appId});

    const authProvider = new WalletConnectProvider({
                                                       infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
                                                       qrcode: false,
                                                   });

  let loggedInUser = Moralis.User.current();
  if (!loggedInUser) {
      await Moralis.authenticate({
                                     provider: "walletConnectElectron",
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
