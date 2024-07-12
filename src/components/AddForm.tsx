import React from 'react'
import noteServices from '../services'
import '../public/css/addform.css'

const AddForm = (props) => {
    const {newNote , setNewNote, setNotes} = props
    // add note method
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
    
  return (
    <div>
        <h1>Add new Note</h1>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default AddForm
