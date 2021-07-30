import { ethers } from 'ethers';
import { SDKInstance } from "./types";
declare class SDK {
    instance: SDKInstance;
    constructor(provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider);
}
export default SDK;
