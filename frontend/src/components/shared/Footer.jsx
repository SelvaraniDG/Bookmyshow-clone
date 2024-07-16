import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.jpg'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center wrapper flex-between flex flex-col 
      gap-4 p-5 text-center sm:flex-row'>
        <Link href='/'>
        <img className='pl-3' src={logo} width={70} height={5} alt="Eventino logo" />
        </Link>
        <p className='pr-5'>2024 Eventino. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer