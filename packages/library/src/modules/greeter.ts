/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
const deploymentFuji = require('hardhat-deploy-example/deployments/fuji/Greeter')
/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
const deploymentImplementationFuji = require('hardhat-deploy-example/deployments/fuji/Greeter_Implementation')
/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
const deploymentMaticTestnet = require('hardhat-deploy-example/deployments/matic_testnet/Greeter')
/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
const deploymentImplementationMaticTestnet = require('hardhat-deploy-example/deployments/matic_testnet/Greeter_Implementation')
/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
const deploymentRinkeby = require('hardhat-deploy-example/deployments/rinkeby/Greeter')
/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
const deploymentImplementationRinkeby = require('hardhat-deploy-example/deployments/rinkeby/Greeter_Implementation')

import { Contract, ethers, Signer } from 'ethers'

class Greeter {
  provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider
  signer: Signer | undefined
  contract: Contract

  constructor(
    provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider,
    networkId = 4,
    signer?: Signer
  ) {
    this.provider = provider
    this.signer = signer

    let abi, address

    if (networkId === 4) {
      abi = deploymentImplementationRinkeby.abi
      address = deploymentRinkeby.address
    }

    if (networkId === 43113) {
      abi = deploymentImplementationFuji.abi
      address = deploymentFuji.address
    }

    if (networkId === 80001) {
      abi = deploymentImplementationMaticTestnet.abi
      address = deploymentMaticTestnet.address
    }

    if (!abi || !address) {
      throw new Error('Network not supported')
    }

    if (signer) {
      this.contract = new ethers.Contract(address, abi, provider).connect(signer)
    } else {
      this.contract = new ethers.Contract(address, abi, provider)
    }
  }

  static async create(
    provider: ethers.providers.Web3Provider | ethers.providers.InfuraProvider,
    signer?: Signer
  ): Promise<Greeter> {
    const networkId = (await provider.getNetwork()).chainId
    return new Greeter(provider, networkId, signer)
  }

  get address(): string {
    return this.contract.address
  }

  get getContract(): Contract {
    return this.contract
  }

  setGreeting = async (greeting: string): Promise<ethers.providers.TransactionReceipt> => {
    const transactionObject = await this.contract.setGreeting(greeting)
    return this.provider.waitForTransaction(transactionObject.hash)
  }

  getGreeting = async (): Promise<string> => {
    return this.contract.greet()
  }
}

export default Greeter
