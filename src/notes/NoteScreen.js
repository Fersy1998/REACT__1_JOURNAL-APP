import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../actions/notes';
import { useForm } from '../hooks/useForm';
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
  const dispatch=useDispatch();
  const {active:note}=useSelector(state=>state.notes);
  const [formValues, handleInputChange, reset]=useForm(note);
  
  const {body, title, id}=formValues;
  //useRef permite mantener una referencia al estado de una variable que cambio (mantiene el estado anterior)
  const activeId=useRef(note.id);
  const activeURL=useRef(note.URL);
  //Efecto para cuando se actualice la nota y mostrar la información actual
  useEffect(() => {
    if(activeId.current!==note.id || activeURL.current !== note.URL ){
      reset(note);
      activeId.current=note.id
    }
  }, [note, reset])
  
  //Efecto para actualizar la nota activa
  useEffect(() => {
    dispatch(activeNote(formValues.id, {...formValues}))
  }, [formValues, dispatch])
  
  const handleDelete=()=>{
    dispatch(startDeleting(id));
  }
  return (
    <div className='note__main-content'>
        <NoteAppBar />
        
        <div className='note__content'>
            <input type='text' name='title' placeholder='some awesome title...' className='note__title-input' value={title} onChange={handleInputChange}/>
            <textarea name='body' placeholder='what happened today?' className='note__textarea' value={body} onChange={handleInputChange}/>
            
            {
            (note.url) &&
            (<div className='note_image'>
                <img src={`${note.url}`}
                alt={title}
                ></img>
            </div>)}
        </div>
        <button className='btn btn-block btn-danger ' onClick={handleDelete}>Borrar</button>
    </div>
  )
}
