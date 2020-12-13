import "./sass/main.scss"; 
import {
  BIP44,
  CoinType,
  validateMnemonic,
  mnemonicToMasterSeed,
  generateWallet,
} from "@neon-exchange/nash-protocol"; 
import { encode as wif_encode } from "wif"; // Tool to convert BTC private key to WIF format

//Initialize a set of words to use in development-mode
const testWords = [
  "fork",
  "fine",
  "current",
  "pipe",
  "kiss",
  "zone",
  "puzzle",
  "eyebrow",
  "logic",
  "lunar",
  "fury",
  "test",
];


(function () {
  document.getElementById("input-words").addEventListener("submit", function (e) {
    e.preventDefault();

    let seedWords = [];
    seedWords.push(e.target.word_1.value.toLowerCase().trim());
    seedWords.push(e.target.word_2.value.toLowerCase().trim());
    seedWords.push(e.target.word_3.value.toLowerCase().trim());
    seedWords.push(e.target.word_4.value.toLowerCase().trim());
    seedWords.push(e.target.word_5.value.toLowerCase().trim());
    seedWords.push(e.target.word_6.value.toLowerCase().trim());
    seedWords.push(e.target.word_7.value.toLowerCase().trim());
    seedWords.push(e.target.word_8.value.toLowerCase().trim());
    seedWords.push(e.target.word_9.value.toLowerCase().trim());
    seedWords.push(e.target.word_10.value.toLowerCase().trim());
    seedWords.push(e.target.word_11.value.toLowerCase().trim());
    seedWords.push(e.target.word_12.value.toLowerCase().trim());
    //seedWords = testWords; // Uncomment for testing with empty fields

    const walletPaths = Object.keys(BIP44); // BTC, ETH, NEO
    const isValidSeed = validateMnemonic(seedWords);

    if (isValidSeed) {
      const masterSeed = mnemonicToMasterSeed(seedWords);
      walletPaths.forEach((chainID) => { // BTC, ETH, NEO
        // https://nash-io.github.io/nash-protocol/index.html#generatewallet
        const wallet = generateWallet(masterSeed, CoinType[chainID], 1, "MainNet"); 
        //Convert BTC to WIF format.
        if (chainID == "BTC") {
          const privateKey = Buffer.from(wallet.privateKey, "hex");
          const wifpk = wif_encode(128, privateKey, true); // for the testnet use: wif.encode(239, ...
          document.getElementById("private_key_BTC_WIF").value = wifpk;
        }
        document.getElementById("public_address_" + chainID).value = wallet.address;
        document.getElementById("private_key_" + chainID).value = wallet.privateKey;
        // Print the public key in the developer console
        console.log(chainID, " public key:\n", wallet.publicKey);
      });
    }
    else {
      walletPaths.forEach((chainID) => { // BTC, ETH, NEO
        document.getElementById("public_address_" + chainID).value = "";
        document.getElementById("private_key_" + chainID).value = "";
        document.getElementById("private_key_BTC_WIF").value = "";
      });
      alert("Invalid seedphrase:\n\n - Make sure to fill all fields\n - Check spelling\n - Check word order");
      //console.error("Invalid seedphrase\n", seedWords);
    }
  });
})()
