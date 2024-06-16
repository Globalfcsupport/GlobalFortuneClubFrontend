import React, { useState } from 'react'
import { useParams } from 'react-router'
import { susers } from '../utils/Users';
import { getuserById } from '../services/services';
import { FaTelegramPlane } from 'react-icons/fa';

const Chat = () => {

    const { id } = useParams();

    const [ user, setUser ] = useState({});
    const [sender, setSender ] = useState('Suhail');
    const [ receiver, setReceiver ] = useState(id)



    const getUserById_Chat = async ()=>{
        try {
            let values = await getuserById(id);
            console.log(values.data,"user");
            setUser(values.data);
        } catch (error) {
            
        }
    }


    const handleSend = ()=> {
        const text = document.getElementById('text').value;
        const chat = {
          sender: 'Suhail',
          receiver: receiver,
          message: text
        }
        document.getElementById('text').value = '';
      }
    
      const handleEnter = (e)=>{
        if(e.key=='Enter'){
          handleSend()
        }
      }

    const chats = [
        {
            receiver: user.name,
            sender: 'Suhail',
            msg: `Hi From ${sender}`
        },
        {
            receiver: 'Suhail',
            sender: user.name,
            msg: `Hi From ${receiver}`
        },
        {
            receiver: user.name,
            sender: 'Suhail',
            msg: `Hi From ${sender}`
        },
        {
            receiver: 'Suhail',
            sender: user.name,
            msg: `Hi From ${receiver}, and How are You? How's all going?`
        },
        {
            receiver: user.name,
            sender: 'Suhail',
            msg: `Hi From ${sender}`
        },
        {
            receiver: 'Suhail',
            sender: user.name,
            msg: `Hi From ${receiver}`
        },
        {
            receiver: user.name,
            sender: 'Suhail',
            msg: `Hi From ${sender}`
        },
        {
            receiver: 'Suhail',
            sender: user.name,
            msg: `Hi From ${receiver}, and How are You? How's all going?`
        },
        {
            receiver: user.name,
            sender: 'Suhail',
            msg: `Hi From ${sender}`
        },
        {
            receiver: 'Suhail',
            sender: user.name,
            msg: `Hi From ${receiver}`
        },
        {
            receiver: user.name,
            sender: 'Suhail',
            msg: `Hi From ${sender}`
        },
        {
            receiver: 'Suhail',
            sender: user.name,
            msg: `Hi From ${receiver}, and How are You? How's all going?`
        },
        {
            receiver: user.name,
            sender: 'Suhail',
            msg: `Hi From ${sender}`
        },
        {
            receiver: 'Suhail',
            sender: user.name,
            msg: `Hi From ${receiver}`
        },
        {
            receiver: user.name,
            sender: 'Suhail',
            msg: `Hi From ${sender}`
        },
        {
            receiver: 'Suhail',
            sender: user.name,
            msg: `Hi From ${receiver}, and How are You? How's all going?`
        },
    ]

    return (
        
        <div className='flex flex-col justify-between overflow-hidden h-full'>
            <div className='bg-blue-300 h-12 flex px-5 py-2 gap-5 items-center'>
                <img src={user.image} alt='' className='h-8 w-8 object-cover rounded-full'/>
                <p>{user.name}</p>
            </div>
            <div className='flex flex-col gap-2 w-full h-full py-1 overflow-y-scroll'>
                {chats.map((item, index)=> (
                    <div key={index} className='flex flex-col'>
                        {item.sender===sender ? 
                            <div className='w-full flex justify-end px-2'>
                                <p className='text-right max-w-60 w-fit px-2 py-1 text-sm bg-black rounded-xl text-white'>{item.msg}</p> 
                            </div> : 
                            <div className='w-full flex justify-start px-2'>
                                <p className='text-left max-w-60 w-fit px-2 py-1 text-sm bg-black rounded-xl text-white'>{item.msg}</p> 
                            </div> 
                        }
                    </div>
                ))}
            </div>
            <div className='px-5 py-2 flex items-center gap-2 justify-center w-full'>
                <input onKeyDown={handleEnter} id='text' className='w-[90%] block px-5 py-1 rounded-xl' type='text' placeholder='Type Text....' />
                <FaTelegramPlane size={25} className='text-blue-600' onClick={handleSend}/>
            </div>
        </div>
    )
}

export default Chat