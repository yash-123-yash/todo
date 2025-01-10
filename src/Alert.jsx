import React from 'react'
import { useEffect } from 'react'

function Alert({type,msg,removeAlert,list}) {

  useEffect(()=>{
    const timeout=setTimeout(()=>{
      removeAlert()
    },2000)
    return ()=>clearTimeout(timeout)
  },[list])
  console.log(type)
  return (
    <div className={`${type=='success' ? 'bg-green-200': 'bg-red-200'} w-full text-center mt-3 py-1`} >
      <p className=''>{msg}</p>
    </div>
  )
}

export default Alert
