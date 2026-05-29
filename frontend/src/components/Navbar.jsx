import React from 'react'
import github from '../assets/github.svg'
const Navbar = () => {
  return (
    <nav className='bg-slate-950 flex justify-between items-center p-4 h-14 text-white xl:justify-around'>
        <div className='font-extrabold text-2xl text-white'><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span></div>
        <button className='cursor-pointer flex gap-2 font-bold items-center bg-green-700 ring-2 ring-white rounded-full px-2'>
            <img src={github} alt="" className='invert w-10'/>
            <a href="https://github.com/kartik9807/" target="_blank" rel="noopener noreferrer" className='text-white'>GitHub</a>
        </button>
    </nav>
  )
}

export default Navbar
