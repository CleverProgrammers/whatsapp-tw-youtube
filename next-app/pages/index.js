import { Chat } from '../components'

import style from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={style.app}>
      <div className={style.container}>
        <Chat />
      </div>
    </div>
  )
}

export default Home
