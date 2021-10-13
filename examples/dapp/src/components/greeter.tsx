import React from 'react'
import SDK from 'sdk-library-boilerplate'
import { useWeb3Context, Web3ContextStatus } from '../contexts/web3Context'
import { ethers } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import { WaitingTransactionMessage } from './messages/waitingTransactionMessage'
import { SuccessTransactionMessage } from './messages/successTransactionMessage'
import { DEFAULT_NETWORK_ID } from '../config/constants'

export const Greeter = () => {
  const { provider, status } = useWeb3Context()
  const { addToast, updateToast } = useToasts()

  const [greeter, setGreeter] = React.useState<Maybe<string>>('...')
  const [newGreeter, setNewGreeter] = React.useState<Maybe<string>>(null)
  const [isExecuted, setIsExecuted] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchGreeter = async () => {
      if (provider) {
        const signer =
          provider instanceof ethers.providers.Web3Provider ? await provider.getSigner() : undefined
        const sdk = await SDK.create(provider, signer)
        const greeter = await sdk.instance.modules.greeter.getGreeting()
        setGreeter(greeter)
      }
    }
    fetchGreeter()
  }, [provider])

  const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewGreeter(event.target.value)
  }, [])

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<EventTarget>) => {
      event.preventDefault()

      if (!provider || !newGreeter) {
        return
      }

      setIsExecuted(true)

      try {
        const signer =
          provider instanceof ethers.providers.Web3Provider ? await provider.getSigner() : undefined
        if (!signer) {
          throw new Error('You need to be connected to your wallet')
        }

        const networkId =
          provider instanceof ethers.providers.Web3Provider
            ? (await provider.getNetwork()).chainId
            : DEFAULT_NETWORK_ID

        const sdk = await SDK.create(provider, signer)
        const { getReceipt, hash } = await sdk.instance.modules.greeter.setGreeting(newGreeter)

        addToast(<WaitingTransactionMessage hash={hash} networkId={networkId} />, {
          appearance: 'info',
          id: hash,
          autoDismiss: false
        })

        await getReceipt()

        updateToast(hash, {
          content: <SuccessTransactionMessage hash={hash} networkId={networkId} />,
          appearance: 'success',
          autoDismiss: true
        })
        setGreeter(newGreeter)
      } catch (err) {
        addToast(err.message, {
          appearance: 'error',
          autoDismiss: false
        })
      }

      setIsExecuted(false)
    },
    [provider, newGreeter]
  )

  return (
    <section id="greeter">
      <header>
        <h1>Greeter is "{greeter}"</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <p className="grouped">
          <input
            type="text"
            disabled={isExecuted || status === Web3ContextStatus.Infura}
            name="greeter"
            id="greeter"
            onChange={handleInputChange}
            placeholder="Greeter"
          />
          <button
            disabled={isExecuted || status === Web3ContextStatus.Infura}
            className="button primary"
            type="submit"
            value="submit"
          >
            Submit
          </button>
        </p>
      </form>
    </section>
  )
}
