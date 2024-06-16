import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { susers } from '../utils/Users';
import { getUsersForChats } from '../services/services';
import { FaUser } from "react-icons/fa";

const Chats = () => {

  const navigate = useNavigate();
  const [ searchText, setSearchText ] = useState('');

  const handleChat = (item)=> {
    setActiveChat(item.userName)
    handleNavigate(item._id);
  }

  const handleNavigate = (item)=> {
    navigate(`${item}`)
  }

  const [ users, setUsers ] = useState(susers);
  const [ activeChat, setActiveChat ] = useState(susers[0].name);

  const handleSearch = (e)=> {
    setSearchText(e.target.value)
  }

const getUsers_ForChats = async ()=>{
  try {
    let apiResponse = await getUsersForChats()
    setUsers(apiResponse.data)
  } catch (error) {
    
  }
  
}

  useEffect(()=> {
    getUsers_ForChats()
    if(searchText){
      const filteredUsers = susers.filter(item=> (
        item.name.toLowerCase().includes(searchText.toLowerCase())
      ))
      setUsers(filteredUsers)
    }
    else{
      setUsers(susers)
    }
  }, [searchText])

  return (
    <div className='rounded-bl-3xl rounded-br-3xl flex flex-col relative h-full overflow-y-scroll'>
      <div className='px-5 py-2 sticky top-0 bg-blue-300'>
        <input type='text' onChange={handleSearch} className='px-5 py-1 text-sm outline-none w-full rounded-md' placeholder='Search User' />
      </div>
      <div className='h-full'>
        {
          users.map((item, index)=> (
            <div key={index} className={`flex gap-5 px-5 py-3 `} onClick={()=>handleChat(item)}>
              {
                item.image? <img src={item.image} alt='user profile pic' className='h-10 w-10 object-cover rounded-full'/>:<FaUser />
              }
              <div>
                <p className='text-sm'>{item.userName}</p>
                <p className='text-xs'>Last Message</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Chats
