import { ethers } from 'ethers'

export interface Transaction {
  hash: string
  getReceipt(): Promise<ethers.providers.TransactionReceipt>
}