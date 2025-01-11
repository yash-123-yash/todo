import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import List from './List';
import Alert from './Alert';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing ,setIsEditing]=useState(false);
  const [editID,setEditID]=useState(null)
  const [alert,setAlert]=useState({show:false,msg:'hello world',type:''})

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log('helo')

    if(!name){
      //display alert
      // setAlert({show:true,msg:'plese enter value',type:'danger'})
      showAlert(true,'danger','plese enter value')
      
    }else if(name && isEditing){
      //deal with edit
      setList(list.map((item)=>{
        if(item.id===editID){
          return {...item,title:name}
        }

        return item

      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true,'success','value changed')

    }else{
      //show alert
      showAlert(true,'success','todo added in the list')
      const newItem={id:new Date().getTime().toString(),title:name};
      setList([...list,newItem]);
      setName('')
    }
  }

  const showAlert=(show=false,type='',msg='')=>{
    setAlert({show:show,type,msg})
  }

  const clearList=()=>{
    showAlert(true,'danger','clear all item')
    setList([])
  }

  const removeItem=(id)=>{
    showAlert(true,'danger','item removed')
    setList(list.filter((item)=>item.id!=id
    ))
  }

  const editItem=(id)=>{
    // console.log("editItem")
    const spacificItem=list.find((item)=>item.id===id);
    setIsEditing(true)
    setEditID(id)
    setName(spacificItem.title)
  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])

  function getLocalStorage(){
    let list=localStorage.getItem('list')
    if(list){
      return JSON.parse(localStorage.getItem('list'))
    }else{
      return []
    }
  }
  return (
    <>
    <div className="bg-slate-200 h-screen w-full flex  justify-center items-center">
      <div className='bg-white p-2 md:w-2/5 w-4/5 flex flex-col items-center justify-center rounded-lg '>
        <div className="w-4/5 mb-5">
        <form action="" className=' flex flex-col items-center justify-center ' onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}

          <h3 className='my-5 text-4xl font-bold  mb-8 border-b-4 pb-1 border-gray-600'>Todos</h3>

          <div className="flex w-full">
            <input type="text"  className=' border-none outline-none w-full mx-4 rounded-md  p-2 bg-blue-200'  placeholder='write' value={name} onChange={(e)=>setName(e.target.value)}/>
            <button type='submit' className='bg-blue-400 px-2 rounded-md '>{isEditing? 'edit':'submit'}</button>
          </div>
          
        </form>
        </div>


        {list.length>0 && (
          <div className="w-4/5 list-none justify-center flex flex-col">
            <List items={list} removeItem={removeItem} editItem={editItem}/>
            <div className="flex justify-center">
            <button className='bg-red-500 w-fit py-2 px-4 my-2 rounded-lg s border-none outline-none text-white' type='submit' onClick={clearList}>clear item</button>
            </div>
            
          </div>          
        )}

      </div>
    </div>
    </>
  )
}

export default App
