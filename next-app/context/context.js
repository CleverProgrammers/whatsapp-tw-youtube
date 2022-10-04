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
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}
export const useAppContext = () => useContext(AppContext)
