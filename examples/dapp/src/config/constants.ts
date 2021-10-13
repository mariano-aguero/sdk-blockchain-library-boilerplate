export const INFURA_ID = process.env.REACT_APP_INFURA_ID
export const DEFAULT_NETWORK_ID = Number(process.env.REACT_APP_DEFAULT_NETWORK_ID || 4)
export const AVAILABLE_NETWORKS = [4, 80001, 43113]
export const NETWORKS: { [key: number]: string } = {
  4: 'Rinkeby',
  80001: 'Matic Mumbai',
  43113: 'Avalanche Fuji'
}
export const EXPLORERS: { [key: number]: string } = {
  4: 'https://rinkeby.etherscan.io/tx/',
  80001: 'https://mumbai.polygonscan.com/tx/',
  43113: 'https://explorer.avax-test.network/tx/'
}
