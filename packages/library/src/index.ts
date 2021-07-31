/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
require('dotenv').config()

import { ethers, Signer } from 'ethers'

import Greeter from './modules/greeter'
import { SDKInstance, PackageModules } from './types'

class SDK {
  instance: SDKInstance

  constructor(
    provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider,
    modules: PackageModules,
    signer?: Signer
  ) {
    this.instance = {
      _provider: provider,
      _ethers: ethers,
      _signer: signer,
      modules
    } as SDKInstance
  }

  static async create(
    provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider,
    signer?: Signer
  ): Promise<SDK> {
    const greeter = await Greeter.create(provider, signer)

    return new SDK(provider, { greeter }, signer)
  }
}

export default SDK
