import { ethers, Signer } from 'ethers'

import Greeter from '../modules/greeter'

export { Transaction } from './transaction'

export interface PackageModules {
  greeter: Greeter
}

export type SDKProvider =
  | ethers.providers.Web3Provider
  | ethers.providers.InfuraProvider
  | ethers.providers.JsonRpcProvider

export interface SDKInstance {
  _provider: SDKProvider
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  _ethers: any
  _signer: Signer | undefined
  modules: PackageModules
}
