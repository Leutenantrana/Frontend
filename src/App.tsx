import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Header from './components/Header'
import noteService from './services/notes'
import loginService from './services/login'
import AddForm from './components/AddForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  })
  //login function
  const handleLogin = async(event)=>{
    event.preventDefault()
    try{
       const user = await loginService.login({
        username, password
       })
       window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
       )
       console.log("this is user in handleLogin " ,user)
       
       noteService.setToken(user.token)
       setUser(user)
       setPassword('')
       setUsername('')
    }catch(exception){
      setErrorMessage('Wrong Credentials')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)

    }
    console.log(user)

  }
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
}

const handleNoteChange = (event) => {
    setNewNote(event.target.value)
} 
 const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    console.log("note before change is " , note)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
   
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  } 


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const loginForm = ()=>(
    <form onSubmit={handleLogin}>
      <div>
        username
          <input name='Username' value={username} onChange={({target})=>setUsername(target.value)} />
      </div>
      <div>
        password
        <input name='Password' value={password} onChange={({target})=>setPassword(target.value)} />

      </div>

      <button type='submit'>Save</button>

     </form>
  )  
  const noteform = ()=> (
    <div>
        <h1>Add new Note</h1>
        <form className='newNoteForm' onSubmit={addNote}>
        <input
            value={newNote}
            onChange={handleNoteChange}
          />
        <button type="submit">save</button>
      </form>
    </div>
  )
  

  return (
    <div className='mainApp'>
      <Header showAll={showAll} setShowAll={setShowAll} />
      <Notification message={errorMessage} />
      {user === null? 
        loginForm()
        :noteform()}

 
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      
    </div>
  )
}

export default App