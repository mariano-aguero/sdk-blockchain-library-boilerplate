# Small Library Example

A JavaScript SDK for Ethereum. Wraps around Ethers.js. Works in the web browser and Node.js.

Pull requests welcome!

# SDK

[![Unit Tests](https://github.com/mariano-aguero/sdk-library-boilerplate/workflows/Unit%20Tests/badge.svg)](https://github.com/mariano-aguero/sdk-library-boilerplate/actions?query=workflow%3A%22Unit+Tests%22)
[![Lint](https://github.com/mariano-aguero/sdk-library-boilerplate/workflows/Lint/badge.svg)](https://github.com/mariano-aguero/sdk-library-boilerplate/actions?query=workflow%3ALint)
[![npm version](https://img.shields.io/npm/v/sdk-library-boilerplate/latest.svg)](https://www.npmjs.com/package/sdk-library-boilerplate/v/latest)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/sdk-library-boilerplate/latest.svg)](https://bundlephobia.com/result?p=sdk-library-boilerplate@latest)


## ENV
Create a .env file copying the .env.example with the correct values
This example needs a infura key, and reads the example contracts from Rinkeby (networkId 4), and a private key with balance in rinkeby.

## Tests
After configuring the .env file run
`yarn test`
This tests are against the actual blockchain
