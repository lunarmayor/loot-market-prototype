import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

class Eth {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.user = null;
    this.loaded = false;
  }

  async setupUser() {
    let address = await this.signer.getAddress();
    let ensName = await this.provider.lookupAddress(address);

    this.user = {
      address,
      name: ensName || address
    };
  }

  async connect() {
    this.modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: "f88221346aa3463ca65a03da4d995d11" // required
          }
        }
      } // required
    });

    if (this.modal.cachedProvider) {
      const rawProvider = await this.modal.connect();
      this.provider = new ethers.providers.Web3Provider(rawProvider);
      this.signer = this.provider.getSigner();

      await this.setupUser();

      this.loaded = true;

      return true;
    }

    return false;
  }

  async logIn() {
    const rawProvider = await this.modal.connect();
    this.provider = new ethers.providers.Web3Provider(rawProvider);
    this.signer = this.provider.getSigner();
    await this.setupUser();

    this.loaded = true;

    return true;
  }
}

export default new Eth();
