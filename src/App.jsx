import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import NotasImp from './components/NotasImp'
import NotasAct from './components/NotasAct'
import axios from 'axios'
import Modal from './components/Modal'
import Footer from './components/Footer'
import NotaPrincipal from './components/NotaPrincipal'

const App = () =>{
  const [modalOpen, setModalOpen] = useState(false)
  const [modalDelete, setModalDelet] = useState(false)
  const [notes, setNewNotes] = useState([])
 const [newNoteTittle, setNewNoteTittle] = useState('')
 const [newNoteCategory, setNewNoteCategory] = useState('')
 const  [newNoteContent, setNewNoteContent] = useState('')
  const [recentNotes, setRecentNotes] = useState([])
  const [box, setBox] = useState(false)
  const [NotaPrincipal, setNotaPrincipal] = useState('')
  const [maxId, setMaxId] = useState('')
// Modales //
  const openModal = () =>{
    setModalOpen(true)
  }

  const closeModal = () =>{
    setModalOpen(false)
    setBox(false)
  }

const openModalDelete =(note) =>{
  setModalDelet(true)
//console.log(note, 'desde el modal');

setNotaPrincipal(note)
}
const closeModalDelete = () =>{
 setModalDelet(false)
}



 //Llamar el JSON //
 useEffect(()=>{
  
  axios
  .get('http://localhost:3001/notes')
  .then(res =>{
    const importantNotes = res.data.filter(nota=> nota.important === true)
    //console.log(importantNotes, 'desde el axio');
    
    setNewNotes(importantNotes.reverse())

  const reverseRecentNotes = res.data
    setRecentNotes(reverseRecentNotes.reverse())
    //console.log(notes, "desde notes");

    
  })

 },[])


 //// validar el id ////
const checkId = () =>{
  let maxId = -1;
      for (let i = 0; i < recentNotes.length; i++) {
      if (recentNotes[i].id > maxId) {
        maxId = recentNotes[i].id;
      }
    }
    console.log(maxId, "desde maxid")
    setMaxId(maxId + 1)

}



//// Agregar notas ////
  const addNote = (event,) =>{
    

//  console.log("add");
    event.preventDefault()
    const objNote = {
      tittle: newNoteTittle,
      category: newNoteCategory,
      content: newNoteContent,
      date: new Date().toISOString(),
      id: maxId,
      important: box
    }
    axios
    .post('http://localhost:3001/notes', objNote)
    .then(res =>{console.log(res)
      const newNotes = notes.concat(objNote)
      const importantNotes = newNotes.filter(nota=> nota.important === true )
      setNewNotes(importantNotes.reverse())
      //console.log(notes, 'solo importantes');
      
      const recentNotesReverse = recentNotes.concat(objNote)
      setRecentNotes(recentNotesReverse.reverse())
      setNewNoteTittle('')
      setNewNoteCategory('')
      setNewNoteContent('')
      setBox(false)
      closeModal()

    })
    
    }



  
    //// obtener el valor de cada input ////
  const handleNoteTittle = (event) =>{
    console.log(event.target.value)
    setNewNoteTittle(event.target.value)
  }
  const handleNoteCategory = (event) =>{
    console.log(event.target.value)
    setNewNoteCategory(event.target.value)
  }
  const handleNoteContent = (event) =>{
    console.log(event.target.value)
    setNewNoteContent(event.target.value)
  }
  const handleBox = (event) =>{
    console.log(event.target.value)
    setBox(!box)
  }
  
const eraseNote = (NotaPrincipal) =>{
  console.log(NotaPrincipal, "desde erase");

  axios
  .delete(`http://localhost:3001/notes/${NotaPrincipal.id}`)
  .then(res =>{
    //console.log(res)
    const newNotes = notes.filter(nota => nota.id !== NotaPrincipal.id)
    setNewNotes(newNotes)
    const recentNotesReverse = recentNotes.filter(nota => nota.id !== NotaPrincipal.id)
    setRecentNotes(recentNotesReverse)
    closeModalDelete()
  })
  

}

  return(
    <div className='headDiv'>
      
      <Header  />
      <Filter openModal={openModal} checkId={checkId} />

      <Modal isOpen={modalOpen} onClose={closeModal}> 
      <form onSubmit={addNote}>
      <label >Título: </label>
        <input placeholder='Título' value={newNoteTittle} onChange={handleNoteTittle} />
        <label className='label-box' >Marcar como importante:
        <input type='checkbox' className='checkbox-cont' onChange={handleBox} />
           </label>
        <input style={{display:'flex'}} placeholder='Categoría' value={newNoteCategory} onChange={handleNoteCategory} />
        
        <textarea className='textarea' placeholder='...'
        value={newNoteContent} onChange={handleNoteContent}
        ></textarea>
        <button className='modal-close' type='submit'> Agregar </button>
      </form>
      
      </Modal>
      
    <Modal isOpen={modalDelete} onClose={closeModalDelete} >
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <h4 > {NotaPrincipal.tittle}</h4>
      <label style={{fontSize:'14'}} > {NotaPrincipal.category} </label>
      <p style={{fontSize: '12px'}}> {NotaPrincipal.content} </p>
      <button className='modal-close' onClick={()=>eraseNote(NotaPrincipal)}> Marcar como completada</button>
      </div>
    </Modal>

      <h3>Notas importantes</h3>
        <div className='notes-container'>
        {notes.map((note) =><NotasImp key={note.id} tittle={note.tittle} category={note.category} content={note.content} remove={()=>openModalDelete(note)}  /> )}
      </div>

      <h3>Tus notas</h3>
      <div className='notes-actual-container'>
      {recentNotes.map((note) =><NotasAct key={note.id} tittle={note.tittle} category={note.category} content={note.content} remove={()=>openModalDelete(note)} />)}
      </div>

      <Footer />
      
    </div>
  )
}


export default App
