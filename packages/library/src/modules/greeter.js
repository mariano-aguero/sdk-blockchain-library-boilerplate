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
import { ethers } from 'ethers'
class Greeter {
  constructor(provider, networkId = 4, signer) {
    this.setGreeting = async (greeting) => {
      const transactionObject = await this.contract.setGreeting(greeting)
      return this.provider.waitForTransaction(transactionObject.hash)
    }
    this.getGreeting = async () => {
      return this.contract.greet()
    }
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
  static async create(provider, signer) {
    const networkId = (await provider.getNetwork()).chainId
    return new Greeter(provider, networkId, signer)
  }
  get address() {
    return this.contract.address
  }
  get getContract() {
    return this.contract
  }
}
export default Greeter
//# sourceMappingURL=greeter.js.map
