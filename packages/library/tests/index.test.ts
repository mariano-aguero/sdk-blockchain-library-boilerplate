require('dotenv').config()
import { ethers } from 'ethers'

import SDK from '../src/index'

describe('test greeter', () => {
  const expectedGreet = 'Hello, world!'

  it('set greeter with private key', async() => {
    // Given
    const provider = new ethers.providers.InfuraProvider(4, process.env.INFURA_API_KEY)
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY ?? '', provider);
    const sdk = await SDK.create(provider, signer)

    // When
    const transaction = await sdk.instance.modules.greeter.setGreeting(expectedGreet)
    const receipt = await transaction.getReceipt() // wait for transaction to be mined

    // Then
    expect(transaction.hash).not.toBeNull()
    expect(receipt.status).toBe(1)

  }, 30000)

  it('display greeter with infura', async() => {
    // Given
    const provider = new ethers.providers.InfuraProvider(4, process.env.INFURA_API_KEY)
    const sdk = await SDK.create(provider)

    // When
    const greet = await sdk.instance.modules.greeter.getGreeting()

    // Then
    expect(greet).toBe(expectedGreet)

  })

})
