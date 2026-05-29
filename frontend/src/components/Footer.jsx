import React from 'react'
import heart from '../assets/heart.png'
const Footer = () => {
  return (
    <div className='bg-black w-full bottom-0 p-2 text-center text-white fixed'>
      Made with <img src={heart} alt="heart" className='inline-block w-5' /> by Kartik &copy; 2026
    </div>
  )
}

export default Footer
