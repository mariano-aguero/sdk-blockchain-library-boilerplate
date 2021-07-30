import { Contract, ethers, Signer } from 'ethers';
declare class Greeter {
    provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider;
    signer: Signer | undefined;
    contract: Contract;
    constructor(provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider, networkId?: number, signer?: Signer);
    static create(provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider, signer?: Signer): Promise<Greeter>;
    readonly address: string;
    readonly getContract: Contract;
    setGreeting: (greeting: string) => Promise<ethers.providers.TransactionReceipt>;
    getGreeting: () => Promise<string>;
}
export default Greeter;
