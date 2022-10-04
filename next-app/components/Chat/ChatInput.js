import { useState } from 'react'
import { useAppContext } from '../../context/context'
import { HiOutlinePaperClip } from 'react-icons/hi'
import { FiSmile } from 'react-icons/fi'
import { IoMdSend } from 'react-icons/io'

import style from '../../styles/Chat.module.css'

const ChatInput = () => {
  const { sendMessage } = useAppContext()
  const [input, setInput] = useState('')

  const handleSendMessage = async event => {
    event.preventDefault()

    await sendMessage(input)
    setInput('')
  }

  return (
    <form>
      <div className={style.footer}>
        <FiSmile className={style.footerIcon} />
        <HiOutlinePaperClip className={style.footerIcon} />
        <input
          className={style.msgInput}
          value={input}
          onChange={event => setInput(event.target.value)}
          type='text'
          placeholder='Type a message'
        />
        <button
          className={style.footerIconContainerButton}
          type='submit'
          onClick={handleSendMessage}
        >
          <IoMdSend className={style.footerIcon} />
        </button>
      </div>
    </form>
  )
}
export default ChatInput
