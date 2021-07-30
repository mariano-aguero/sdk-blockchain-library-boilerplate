export const INFURA_ID = process.env.REACT_APP_INFURA_ID
export const DEFAULT_NETWORK_ID = Number(process.env.REACT_APP_DEFAULT_NETWORK_ID || 4)
export const AVAILABLE_NETWORKS = [1, 137, 80001, 4, 43114, 43113]

export const NETWORKS: {[key: number]: string} = {
  1 : 'Mainnet',
  4 : 'Rinkeby',
  137: 'Matic',
  80001: 'Matic Mumbai',
  43113: 'Avalanche Fuji',
  43114: 'Avalanche',
}
