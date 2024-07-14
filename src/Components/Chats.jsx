import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { susers } from '../utils/Users';
import { getUsersForChats } from '../services/services';
import { FaSearch, FaUser } from "react-icons/fa";

const Chats = () => {

  const navigate = useNavigate();
  const [ searchText, setSearchText ] = useState('');
  const [ users, setUsers ] = useState([]);
  const [ activeChat, setActiveChat ] = useState('');
  const [ datas, setDatas ] = useState([]);

  const handleChat = (item)=> {
    setActiveChat(item.userName)
    handleNavigate(item._id);
  }

  const handleNavigate = (item)=> {
    navigate(`${item}`)
  }

  const handleSearch = (e)=> {
    setSearchText(e.target.value)
  }

const getUsers_ForChats = async ()=>{
  try {
    let apiResponse = await getUsersForChats()
    setDatas(apiResponse.data)
    setUsers(apiResponse.data)
  } catch (error) {
    console.log(error);
  }
  
}

  useEffect(()=> {
    getUsers_ForChats()
  }, [])

  useEffect(()=> {
    if(searchText){
      const filteredUsers = users.filter(item=> (
        item.userName.toLowerCase().includes(searchText.toLowerCase())
      ))
      setUsers(filteredUsers)
    }
    else{
      setUsers(datas)
    }
  }, [searchText])

  return (
    <div className='rounded-bl-3xl rounded-br-3xl flex flex-col relative h-full'>
      <div className='px-5 py-2 sticky top-0 bg-primary'>
        <div className='relative h-fit'>
        <input type='text' onChange={handleSearch} className='px-5 py-1 text-sm w-full rounded-md' placeholder='Search User' />
        <FaSearch className='absolute top-2 right-2 text-primary'/>
        </div>
      </div>
      <div className='h-full overflow-scroll'>
        {users.length == 0 ? 
          <p className='h-full justify-center flex items-center'>No Users</p> :
          users.map((item, index)=> (
            <div key={index} className={`flex gap-5 px-5 py-3 `} onClick={()=>handleChat(item)}>
              {
                item.image ? <img src={item.image} alt='user profile pic' className='h-10 w-10 object-cover rounded-full'/>:<div className='bg-secondary rounded-full h-10 w-10 flex justify-center items-center'><span className='font-semibold text-3xl h-full w-full text-primary flex justify-center items-center -mt-1'>{item.userName.split("")[0]}</span></div>
              }
              <div>
                <p className='text-sm font-semibold'>{item.userName}</p>
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
