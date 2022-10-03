import { useEffect, useState, useContext, createContext } from 'react'
import truncateEthAddress from 'truncate-eth-address'

import {
  useAccount,
  useContract,
  useContractWrite,
  useContractRead,
} from '@thirdweb-dev/react'

import moment from 'moment'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const { account } = useAccount()

  const [messages, setMessages] = useState([])
  const [userAddress, setUserAddress] = useState('')

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const { mutateAsync: message, isLoading: sendMessageLoading } =
    useContractWrite(contract, 'sendMessage')
  const { data: messagesData, isLoading: messagesLoading } = useContractRead(
    contract,
    'getAllMessages',
  )

  useEffect(() => {
    setUserAddress(account)
    getMessages()
  }, [account, messagesLoading])

  const getMessages = async () => {
    try {
      if (messagesLoading) return

      const formattedMessages = messagesData.map(message => ({
        address: truncateEthAddress(message.user),
        message: message.message,
        timestamp: moment
          .unix(parseInt(message.timestamp.toString()))
          .format('h:mm a'),
      }))

      setMessages(formattedMessages)
    } catch (error) {
      console.error(error)
    }
  }

  const sendMessage = async msg => {
    try {
      await message([msg])

      await getMessages()
      return true
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AppContext.Provider value={{ userAddress, messages, sendMessage }}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => useContext(AppContext)
