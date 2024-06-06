import gpmuthu from '../assets/Images/gpmuthu.jpeg'
import gana_vicky from '../assets/Images/gana vicky.jpg'
import ronaldo from '../assets/Images/ronaldo.jpg'
import { useEffect, useState } from 'react'
import { FaTelegramPlane } from "react-icons/fa";

const SupportAdminChart = () => {

  const susers = [
    {
      image: gpmuthu,
      name: 'GP Muthu',
    },
    {
      image: gana_vicky,
      name: 'Gana Vicky',
    },
    {
      image: ronaldo,
      name: 'Ronaldo',
    },
  ]

  const chats = [
    {
      sender: 'Suhail',
      receiver: susers[0].name,
      message: 'Vanakkam Da Mapla Royapuram la irunthu'
    },
    {
      sender: susers[0].name,
      receiver: 'Suhail',
      message: 'Vanakkam Da Mapla Teynampet la irunthu'
    }
  ]

  const[chatstate,setchatstate]=useState(chats)
  const [ sender, setSender ] = useState('Suhail');
  const [ users, setUsers ] = useState(susers);
  const [ activeChat, setActiveChat ] = useState(0);
  const [ receiver, setReceiver ] = useState('');
  const [ searchText, setSearchText ] = useState('');

  const handleSearch = (e)=> {
    setSearchText(e.target.value);
  }

  useEffect(()=> {
    if(searchText){
      const filteredUsers = susers.filter(item=> (
        item.name.toLowerCase().includes(searchText.toLowerCase())
      ))
      console.log(filteredUsers);
      setUsers(filteredUsers)
    }
    else{
      setUsers(susers)
    }

  }, [searchText])

  const switchChat = (e)=> {
    const activeIndex = e.target.closest('div').getAttribute('data-index');
    setActiveChat(activeIndex);
    setReceiver(users[activeChat].name)
  }

  const handleSend = ()=> {
    const text = document.getElementById('text').value;
    const chat = {
      sender: 'Suhail',
      receiver: receiver,
      message: text
    }
    console.log(chat);
    chats.push(chat);
    document.getElementById('text').value = ''
    setchatstate((prev)=>([...prev,chat]))
  }

  useEffect(()=> {
    setchatstate(prev=>prev)
  },[activeChat, receiver])

  const handleEnter = (e)=>{
    if(e.key=='Enter'){
      handleSend()
    }
  }
 
  return (
    <div className="h-full w-full flex">
      <div className="w-[30%] bg-[#5270b02d]  flex flex-col gap-3">
        <div className="p-2">
          <input type="text" value={searchText} placeholder="Search User" onChange={handleSearch} className="w-[90%] mx-auto block rounded-lg px-4 py-2 outline-none text-sm"/>
        </div>
        <div className='flex flex-col'>
          {users.map((item, index)=> (
            <div key={index} data-index={index} className={`flex px-4 py-2 gap-2 ${activeChat==index && 'bg-blue-200'}`} onClick={switchChat}>
              <img src={item.image} className='h-10 w-10 rounded-full'/>
              <div>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[70%] bg-blue-200 flex flex-col">
        <div className='bg-blue-400 h-16 py-8 px-5 flex gap-3 items-center'>
          <img className='h-10 w-10 rounded-full' src={users[activeChat].image} />
          <p className='text-white'>{users[activeChat].name}</p>
        </div>
        <div className='w-full h-full flex flex-col gap-2 overflow-y-auto p-5'>
          {chatstate.map((item, index)=> (
            <div key={index} className='flex flex-col'>
              {(item.sender==sender && item.receiver===receiver) ?
              <div className='w-full flex justify-end items-end'>
                <p className='bg-white text-black w-[40%] px-4 py-1 rounded-xl text-wrap'>
                  {item.message}
                </p>
              </div>
              : (item.sender === receiver && item.receiver==sender)  ?
              <div className='w-full flex justify-start items-end'>
              <p className='bg-white text-black w-[40%] px-4 py-1 rounded-xl text-wrap'>
                {item.message}
              </p>
            </div>: null}
            </div>
          ))}
        </div>
        <div className='flex w-full pb-3 items-center justify-center gap-2 bottom-0'>
          <input onKeyDown={handleEnter}  id='text' className='w-[90%] block px-5 py-2 rounded-xl outline-none' type='text' placeholder='Type Text....' />
          <FaTelegramPlane size={30} className='text-blue-600' onClick={handleSend}/>
        </div>
      </div>
    </div>
  )
}

export default SupportAdminChart
