import React from 'react'
import { useToasts } from 'react-toast-notifications'

import { useWeb3Context, Web3ContextStatus } from '../contexts/web3Context'
import { truncateStringInTheMiddle } from '../utils/tool'
import { NETWORKS } from '../config/constants'

export const Connect = () => {
  const { status, address, disconnect, connect, provider } = useWeb3Context()
  const { addToast } = useToasts()

  const [networkName, setNetworkName] = React.useState<string>('')

  React.useEffect(() => {
    const getNetworkName = async () => {
      if (provider && status !== Web3ContextStatus.WrongNetwork) {
        const chainId = (await provider.getNetwork()).chainId
        setNetworkName(NETWORKS[+chainId] ?? '')
      } else {
        setNetworkName('')
      }
    }

    getNetworkName()
  }, [provider, status])

  const handleDisconnect = React.useCallback(async () => {
    await disconnect()
  }, [])

  const handleConnect = React.useCallback(async () => {
    const status: Web3ContextStatus = await connect()
    if (status === Web3ContextStatus.WrongNetwork) {
      addToast(`You are trying to connect to an unsupported network.`, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }, [])

  return (
    <>
      {address && (
        <>
          <div className="is-vertical-align" title={address}>
            {truncateStringInTheMiddle(address, 6, 4)}&nbsp;|
          </div>
          {networkName && (
            <div className="is-vertical-align" title={networkName}>
              {networkName}&nbsp;|
            </div>
          )}
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
