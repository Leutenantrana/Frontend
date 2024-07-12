import React from 'react'
import '../public/css/header.css'
const Header = (props) => {
    const {showAll , setShowAll} = props
  return (
    <header>
      <h1>Notes</h1>
      <div className='showButton'>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>

      </div>
    </header>
  )
}

export default Header
