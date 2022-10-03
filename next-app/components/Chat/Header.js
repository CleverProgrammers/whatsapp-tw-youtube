import Image from 'next/image'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'

import style from '../../styles/Chat.module.css'

const Header = ({ messages }) => {
  return (
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
        <div className={style.roomTitle}>Room Name</div>
        <div className={style.lastSeen}>
          last seen {messages[messages.length - 1]?.timestamp}
        </div>
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
  )
}
export default Header
