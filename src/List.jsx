import React from 'react'
// import { FaEdit,FaTrash} from react-icons;
import { FaEdit,FaTrash } from 'react-icons/fa'

function List({items,removeItem,editItem}) {
  return (
    <div className=''>
      {items.map((item)=>{
        const {id,title}=item

        return <li key={id} className='border-b-2 border-l-2 border-gray-300 bg-gray-100 flex justify-between px-3 py-3 rounded-full mb-2'>
            <p className=''>{title}</p>
            <div className="">
                <button type='button' className='' onClick={()=>editItem(id)}><FaEdit style={{color:'green'}} /></button>
                <button type='button' className='mx-4' onClick={()=>removeItem(id)}><FaTrash style={{color:'red'}}/></button>
            </div>
        </li>
      })}
    </div>
  )
}

export default List
