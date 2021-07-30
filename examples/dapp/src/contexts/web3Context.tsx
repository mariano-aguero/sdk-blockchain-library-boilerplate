import React from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import { AVAILABLE_NETWORKS, DEFAULT_NETWORK_ID, INFURA_ID } from '../config/constants'

export enum Web3ContextStatus {
  NotAsked = 'notAsked',
  Error = 'error',
  WrongNetwork = 'wrongNetwork',
  Connecting = 'connecting',
  Connected = 'connected',
  Infura = 'infura'
}

export interface IWeb3Context {
  status: Maybe<Web3ContextStatus>
  provider: Maybe<ethers.providers.Web3Provider | ethers.providers.InfuraProvider>
  address: Maybe<string>
  connect: () => Promise<Web3ContextStatus>
  disconnect: () => Promise<void>
}

export const WEB3_CONTEXT_DEFAULT_VALUE = {
  status: null,
  provider: null,
  address: null,
  connect: async () => Web3ContextStatus.NotAsked,
  disconnect: async () => {
    return
  }
}

const Web3Context = React.createContext<IWeb3Context>(WEB3_CONTEXT_DEFAULT_VALUE)

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID
      }
    }
  }
})

interface Props {
  children: React.ReactNode
}

export const Web3ContextProvider = (props: Props) => {
  const statusDefault: Web3ContextStatus = web3Modal.cachedProvider
    ? Web3ContextStatus.Connecting
    : Web3ContextStatus.NotAsked

  const [status, setStatus] = React.useState<Maybe<Web3ContextStatus>>(statusDefault)
  const [provider, setProvider] =
    React.useState<Maybe<ethers.providers.Web3Provider | ethers.providers.InfuraProvider>>(null)
  const [address, setAddress] = React.useState<Maybe<string>>(null)

  const connectInfura = React.useCallback(async () => {
    try {
      if (status === Web3ContextStatus.Infura) {
        return
      }

      const provider = new ethers.providers.InfuraProvider(DEFAULT_NETWORK_ID, INFURA_ID)
      const networkId = (await provider.getNetwork()).chainId

      if (!AVAILABLE_NETWORKS.includes(+networkId)) {
        setStatus(Web3ContextStatus.WrongNetwork)
        return
      }

      setStatus(Web3ContextStatus.Infura)
      setProvider(provider)
      setAddress(null)
    } catch (err) {
      web3Modal.clearCachedProvider()
      setStatus(Web3ContextStatus.Error)
    }
  }, [status])

  const disconnect = React.useCallback(async () => {
    if (status !== Web3ContextStatus.Connected) {
      return
    }
    await web3Modal.clearCachedProvider()
    setStatus(Web3ContextStatus.NotAsked)
  }, [status])

  const subscribeEvents = React.useCallback(
    (provider) => {
      provider.once('close', async () => {
        await disconnect()
      })

      provider.once('disconnect', async () => {
        await disconnect()
      })

      provider.once('accountsChanged', async (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
        } else {
          // Metamask send an `accountsChanged` event when lock account
          await disconnect()
        }
      })

      provider.once('chainChanged', async (networkId: number) => {
        if (!AVAILABLE_NETWORKS.includes(+networkId)) {
          setStatus(Web3ContextStatus.WrongNetwork)
        }
      })
    },
    [disconnect]
  )

  const connectInjected = React.useCallback(async (): Promise<Web3ContextStatus> => {
    try {
      if (status === Web3ContextStatus.Connected) {
        return Web3ContextStatus.Connected
      }

      const provider = await web3Modal.connect()
      const web3Provider = new ethers.providers.Web3Provider(provider)

      const networkId = (await web3Provider.getNetwork()).chainId

      if (!AVAILABLE_NETWORKS.includes(+networkId)) {
        setStatus(Web3ContextStatus.WrongNetwork)
        return Web3ContextStatus.WrongNetwork
      }

      const accounts = await web3Provider.listAccounts()

      setStatus(Web3ContextStatus.Connected)
      setProvider(web3Provider)
      setAddress(accounts[0])
      subscribeEvents(provider)

      return Web3ContextStatus.Connected
    } catch (err) {
      web3Modal.clearCachedProvider()
      setStatus(Web3ContextStatus.Error)

      return Web3ContextStatus.Error
    }
  }, [status, subscribeEvents])

  React.useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectInjected()
    } else {
      connectInfura()
    }
  }, [connectInjected, connectInfura])

  const value = {
    status,
    provider,
    address,
    connect: connectInjected,
    disconnect
  }

  return <Web3Context.Provider value={value}>{props.children}</Web3Context.Provider>
}

export const useWeb3Context = (): IWeb3Context => {
  const context = React.useContext(Web3Context)
  if (!context) {
    throw new Error('[useWeb3Context] Hook not used under web3 context provider')
  }
  return context
}
