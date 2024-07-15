import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Header from './components/Header'
import noteService from './services/notes'
import loginService from './services/login'
import NoteForm from './components/NoteForm'
import Loginform from './components/Loginform'
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

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
  },[])
  //login function

  const handleLogout=()=>{
    window.localStorage.clear()
    setUser(null)
  }
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
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
  const deleteNote =async(id) =>{
    try{
      await noteService
        .deleteNote(id)
      
    }catch(error){
       console.log(error)
    }  
    setNotes(notes.filter(note => note.id !== id ))
  }


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const loginForm =()=>{
    return(
    <Togglable buttonLabel="login" >
      <Loginform 
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        user={user}
        setUser={setUser}
        />
    </Togglable>
    )
  }
  const noteform =()=>{
    return(
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm
          createNote={addNote}
        />
      </Togglable>
    )
  }
  console.log(user)

  const userLoggedin = ()=> {
    return(
      <div>
        <div className='userDetailBox'>
          <p className='userDetails'>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
        {noteform()}

      </div>
    )
  }

  return (
    <div className='mainApp'>
      <Header showAll={showAll} setShowAll={setShowAll} />
      <Notification message={errorMessage} />
       {!user && loginForm()}
       {user && userLoggedin()}

 
      <ul className='allNotes'>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            deleteNote = {()=>deleteNote(note.id)}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      
    </div>
  )
}

export default App