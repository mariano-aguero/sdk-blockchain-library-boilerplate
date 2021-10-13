import { truncateStringInTheMiddle } from '../../utils/tool'
import { EXPLORERS } from '../../config/constants'

export const SuccessTransactionMessage = ({
  hash,
  networkId
}: {
  hash: string
  networkId: number
}) => {
  return (
    <span>
      Transaction Successful &nbsp;
      <a href={`${EXPLORERS[networkId]}${hash}`} target="_blank">
        {truncateStringInTheMiddle(hash, 6, 4)}
      </a>
    </span>
  )
}
