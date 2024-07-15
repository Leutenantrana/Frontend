import React from 'react'
import noteService from '../services/notes.js'
import loginService from '../services/login.js'
import Notification from './Notification'


import { useState } from 'react'

const Loginform = ({errorMessage, setErrorMessage,user,setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async(event)=>{
        event.preventDefault()

        try{
            const userObject ={
                username,
                password,
            }
           const user = await loginService.login(userObject)
           window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
           )
           console.log("this is user in handleLogin " ,user)
           
           noteService.setToken(user.token)
           setUser(user)
    
        }catch(exception){
          setErrorMessage('Wrong Credentials')
          setTimeout(()=>{
            setErrorMessage(null)
          },5000)
    
        }
        console.log(user)
    
      }

    return (
    <div className='loginFormMainDiv'>
       <form className='loginForm' onSubmit={handleLogin}>
       <h2>Login Form</h2>
        <div>
            username
            <input name='Username' value={username} onChange={event => setUsername(event.target.value)} />
        </div>
        <div>
            password
            <input name='Password' value={password} onChange={event => setPassword(event.target.value)} />

        </div>

        <button type='submit'>Save</button>

     </form>
    </div>
  )
}

export default Loginform
