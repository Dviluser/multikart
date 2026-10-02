import React, { useContext } from 'react'
import user_context from './Context'

const Contextdata = () => {
    const {Firstname,Lastname,Email,Password}=useContext(user_context)
  return (
    <div>
      <h1>{Firstname}</h1>
      <h1>{Lastname}</h1>
      <h1>{Email}</h1>
      <h1>{Password}</h1>
    </div>
  )
}

export default Contextdata
