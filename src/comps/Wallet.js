import React, { useState } from "react";
import Web3 from "web3";
import ABI from "../abi/abi.json";

const Wallet = () => {
  const [wallet, setWallet] = useState(null);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      console.log("MetaMask Here!");
      window.web3 = new Web3(window.ethereum);
      const w = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWallet(w[0]);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      // window.ethereum
      //   .request({ method: "eth_requestAccounts" })
      //   .then((result) => {
      //     console.log("Wallet Connected");
      //     console.log(result[0]);
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });
    } else {
      console.log("Need to install MetaMask");
      // setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  const loadData = async () => {
    const web3 = window.web3;
    console.log(web3.eth);

    const contract = new web3.eth.Contract(
      ABI,
      "0xeDF9A071bc9a5BA5959b186f3c50a1Bb8C2b22e2"
    );
    const balance = await contract.methods.balanceOf(wallet).call();
    console.log(balance);
  };

  return (
    <div>
      <button onClick={connectWalletHandler}>Connect to Wallet</button>
      <button onClick={loadData}>Get accounts</button>
    </div>
  );
};

export default Wallet;
