import { truncateStringInTheMiddle } from '../../utils/tool'
import { EXPLORERS } from '../../config/constants'

export const WaitingTransactionMessage = ({
  hash,
  networkId
}: {
  hash: string
  networkId: number
}) => {
  return (
    <span>
      Waiting Transaction &nbsp;
      <a href={`${EXPLORERS[networkId]}${hash}`} target="_blank">
        {truncateStringInTheMiddle(hash, 6, 4)}
      </a>
    </span>
  )
}
