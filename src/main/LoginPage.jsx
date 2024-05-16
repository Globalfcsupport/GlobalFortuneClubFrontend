import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-slate-700'>
        <section className='p-5  flex flex-col gap-5 rounded-md bg-gray-900 text-white w-[300px]'>
            <h1 className='text-center text-2xl font-semibold'>Hello Admin!</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor='username'>Enter Your Username</label>
                <input type='text' placeholder='Username' className='outline-none bg-transparent text-white border border-slate-700 px-3 p-1 rounded-md'/>
            </div>
            <div className='flex flex-col gap-2 pb-10'>
                <label htmlFor='username'>Enter Your Password</label>
                <input type='text' placeholder='Password' className='outline-none bg-transparent border text-white border-slate-700 px-3 p-1 rounded-md'/>
            </div>
            <button className='p-2 bg-blue-700 rounded-lg text-white'>Login</button>
        </section>
    </div>

  )
}

export default LoginPage
