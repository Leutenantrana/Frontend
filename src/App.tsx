import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Header from './components/Header'
import noteService from './services/notes'
import AddForm from './components/AddForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  //login function
  const handleLogin =(event)=>{
    event.preventDefault()
    console.log("we are handling login")
  }

  // const addNote = (event) => {
  //   event.preventDefault()
  //   const noteObject = {
  //     content: newNote,
  //     important: Math.random() > 0.5,
  //   }
  
  //   noteService
  //     .create(noteObject)
  //       .then(returnedNote => {
  //       setNotes(notes.concat(returnedNote))
  //       setNewNote('')
  //     })
  // }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    console.log("note before change is " , note)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
          //  .then(returnedNote =>
          //   console.log("note recieved by noteservice is",returnedNote)
          //  )
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

  // const handleNoteChange = (event) => {
  //   setNewNote(event.target.value)
  // }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div className='mainApp'>
      <Header showAll={showAll} setShowAll={setShowAll} />
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>

      </form>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <AddForm newNote={newNote} setNewNote={setNewNote} setNotes={setNotes} />

      
    </div>
  )
}

export default App