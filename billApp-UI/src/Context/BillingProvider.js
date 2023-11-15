import { useContext,createContext,useState,useEffect } from "react";
import React from 'react'
const BillingContext = createContext();

const BillingProvider = ({children}) => {
    const [navName,setnavName] = useState('Dashboard')
  return (
    <BillingContext.Provider
        value={{navName,setnavName}}
    >
     {children}   
    </BillingContext.Provider>
  )
}

export const BillingState = ()=>{
    return useContext(BillingContext)
}
export default BillingProvider