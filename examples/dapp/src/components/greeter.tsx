import React from 'react'
import SDK from 'sdk-library-boilerplate'
import { useWeb3Context } from '../contexts/web3Context'
import { ethers } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import { truncateStringInTheMiddle } from '../utils/tool'

export const Greeter = () => {
  const { provider } = useWeb3Context()
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewGreeter(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    setIsExecuted(true)

    if (provider && newGreeter) {
      const signer =
        provider instanceof ethers.providers.Web3Provider ? await provider.getSigner() : undefined
      const sdk = await SDK.create(provider, signer)
      let transaction
      try {
        transaction = await sdk.instance.modules.greeter.setGreeting(newGreeter)
      } catch(err) {
        console.error(err)
        addToast(err.message, {
          appearance: 'error',
          autoDismiss: false
        })
        setIsExecuted(false)
        return
      }
      addToast(
        <span>Waiting Transaction &nbsp;
          <a href={`${process.env.REACT_APP_DEFAULT_NETWORK_EXPLORER}/tx/${transaction.hash}`} target="_blank" >
            {truncateStringInTheMiddle(transaction.hash, 6, 4)}
          </a>
        </span>
        , {
        appearance: 'info',
        id: transaction.hash,
        autoDismiss: false
      })
      try {
        await transaction.getReceipt()
        updateToast(transaction.hash,  {
          content:
            <span>Transaction Successful &nbsp;
              <a href={`${process.env.REACT_APP_DEFAULT_NETWORK_EXPLORER}/tx/${transaction.hash}`} target="_blank" >
                {truncateStringInTheMiddle(transaction.hash, 6, 4)}
              </a>
            </span>,
          appearance: 'success',
          autoDismiss: true
        })
        setGreeter(newGreeter)
      } catch(err){
        console.error(err)
        addToast(err.message, {
          appearance: 'error',
          autoDismiss: false
        })
      }
    }

    setIsExecuted(false)
  }

  return (
    <section id="greeter">
      <header>
        <h1>Greeter is "{greeter}"</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <p className="grouped">
          <input
            type="text"
            disabled={isExecuted}
            name="greeter"
            id="greeter"
            onChange={handleInputChange}
            placeholder="Greeter"
          />
          <button disabled={isExecuted} className="button primary" type="submit" value="submit">
            Submit
          </button>
        </p>
      </form>
    </section>
  )
}
