import { useState } from 'react'
import HeaderMenu from './HeaderMenu'
import Search from './Search'
import Logo from '/img/Logo.svg'
import { Link } from 'react-router-dom'

function Navbar({query, setQuery}) {
  
  return (
    <div className="border border-border">
      <div className="container flex gap-x-64 items-center justify-between">
        <Link to="/">
          <img className='w-148' src={Logo} />
        </Link>
        <div className='flex-grow-1'>
          <Search query={query} setQuery={setQuery} />
        </div>
        <div>
          <HeaderMenu />
        </div>
      </div>
    </div>
  )
}

export default Navbar
