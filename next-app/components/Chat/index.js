import Image from 'next/image'
import ChatInput from './ChatInput'
import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
import truncateEthAddress from 'truncate-eth-address'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { useAppContext } from '../../context/context'

import style from '../../styles/Chat.module.css'

const Chat = () => {
  const { messages } = useAppContext()

  const account = useAddress()

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        {account ? (
          <>
            <div className={style.imageContainer}>
              <Image
                className={style.image}
                src={`https://avatars.dicebear.com/api/identicon/1.svg`}
                layout='fill'
                alt='Profile Image'
              />
            </div>
            <div className={style.info}>
              <div className={style.roomTitle}>Clever Programmer</div>
              <div className={style.lastSeen}>last seen{''}</div>
            </div>

            <div className={style.headerRight}>
              <div className={style.headerIconContainer}>
                <AiOutlineSearch className={style.headerIcon} />
              </div>
              <div className={style.headerIconContainer}>
                <BiChevronDown className={style.headerIcon} />
              </div>
            </div>
          </>
        ) : (
          <ConnectWallet />
        )}
      </div>

      <div className={style.chatContainer}>
        {account && (
          <>
            {messages.map((message, index) => (
              <p
                key={index}
                className={`${style.message} ${
                  message.address === truncateEthAddress(account) &&
                  style.receiver
                }`}
              >
                <span className={`${style.sender}`}>{message.address}</span>
                {message.message}
                <span className={style.msgTimestamp}>{message.timestamp}</span>
              </p>
            ))}
          </>
        )}
      </div>

      <ChatInput />
    </div>
  )
}

export default Chat
