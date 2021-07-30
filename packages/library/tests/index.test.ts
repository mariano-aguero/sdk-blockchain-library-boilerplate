import { ethers } from 'ethers'

import SDK from '../src/index'

describe('test greeter', () => {
  it('display greeter with infura', async() => {
    // Given
    const provider = new ethers.providers.InfuraProvider(4, process.env.INFURA_API_KEY)
    const sdk = await SDK.create(provider)

    // When
    const greet = await sdk.instance.modules.greeter.getGreeting()

    // Then
    expect(greet).toBe('Hello, world!')

  })

})
