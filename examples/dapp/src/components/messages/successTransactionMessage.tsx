import { truncateStringInTheMiddle } from '../../utils/tool'
import { NETWORK_EXPLORER } from '../../config/constants'

export const SuccessTransactionMessage = ({ hash }: { hash: string }) => {
  return (
    <span>
      Transaction Successful &nbsp;
      <a href={`${NETWORK_EXPLORER}/tx/${hash}`} target="_blank">
        {truncateStringInTheMiddle(hash, 6, 4)}
      </a>
    </span>
  )
}
