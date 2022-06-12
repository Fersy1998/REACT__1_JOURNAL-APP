import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { activeNote, startSaveNotes, startUploading } from '../actions/notes';
import { useForm } from '../hooks/useForm';

export const NoteAppBar = () => {
  const dispatch=useDispatch();
  const {active}=useSelector(state=>state.notes)
  
  const handleSave=()=>{
    dispatch(startSaveNotes({...active}))
  }
  const handlePictureClick=()=>{
      document.querySelector('#fileSelector').click();
  }
  const handleFileChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      dispatch(startUploading(file));
    }
  
  }
  return (
    <div className='note__appbar'>
        <span>28 Agust 2020</span>
        <input type='file' name='file' id='fileSelector' style={{display:'none'}} onChange={handleFileChange}/>
        <div>
            <button className='btn' onClick={handlePictureClick}>
                Picture
            </button>
            <button className='btn' onClick={handleSave}>
                Save
            </button>
        
        </div>
       
    </div>
  )

}