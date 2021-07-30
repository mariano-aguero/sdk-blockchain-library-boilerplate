import { ethers } from 'ethers';
export interface SDKInstance {
    _provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider;
    _ethers: any;
    greeter: any;
}
