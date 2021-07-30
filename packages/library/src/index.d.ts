import { ethers, Signer } from 'ethers';
import { SDKInstance, PackageModules } from "./types";
declare class SDK {
    instance: SDKInstance;
    constructor(provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider, modules: PackageModules, signer?: Signer);
    static create(provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider, signer?: Signer): Promise<SDK>;
}
export default SDK;
