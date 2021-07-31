import { ethers, Signer } from 'ethers'
import Greeter from '../modules/greeter'
export interface PackageModules {
  greeter: Greeter
}
export interface SDKInstance {
  _provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider
  _ethers: any
  _signer: Signer | undefined
  modules: PackageModules
}
