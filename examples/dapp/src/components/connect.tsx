import React from 'react'
import { useToasts } from 'react-toast-notifications'

import { useWeb3Context, Web3ContextStatus } from '../contexts/web3Context'
import { truncateStringInTheMiddle } from '../utils/tool'

export const Connect = () => {
  const { address, disconnect, connect } = useWeb3Context()
  const { addToast } = useToasts()

  const handleDisconnect = () => {
    disconnect()
  }

  const handleConnect = async () => {
    connect().then((status: Web3ContextStatus) => {
      if (status === Web3ContextStatus.WrongNetwork) {
        addToast(`You are trying to connect to an unsupported network.`, {
          appearance: 'error',
          autoDismiss: true
        })
      }
    })
  }

  return (
    <>
      {address && (
        <>
          <div className="is-vertical-align" title={address}>
            {truncateStringInTheMiddle(address, 6, 4)}&nbsp;|
          </div>
          <div className="button primary icon" style={{ zIndex: 0 }} onClick={handleDisconnect}>
            Disconnect&nbsp;
            <img
              src="https://icongr.am/clarity/disconnect.svg?size=16&amp;color=ffffff"
              alt="icon"
            />
          </div>
        </>
      )}
      {!address && (
        <div className="button primary icon" style={{ zIndex: 0 }} onClick={handleConnect}>
          Connect&nbsp;
          <img src="https://icongr.am/clarity/connect.svg?size=16&amp;color=ffffff" alt="icon" />
        </div>
      )}
    </>
  )
}
