import '../public/css/note.css'
const Note = ({ note, toggleImportance , deleteNote }) => {

  const label = note.important
    ? 'make not important' : 'make important'


  return (
    <li className='note'>
      {note.content}
      <div className="noteBtns">
        <button onClick={toggleImportance}>{label}</button>
        <button onClick={deleteNote}>delete</button>

      </div>
    </li>
  )
}

export default Note