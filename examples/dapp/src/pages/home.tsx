import React from 'react'
import { ToastProvider } from 'react-toast-notifications'

import { Header } from '../components/header'
import { Web3ContextProvider } from '../contexts/web3Context'
import { Greeter } from '../components/greeter'

export const Home = () => {
  return (
    <ToastProvider>
      <Web3ContextProvider>
        <Header />
        <div className="container" style={{ marginTop: '30px' }}>
          <Greeter />
        </div>
      </Web3ContextProvider>
    </ToastProvider>
  )
}
