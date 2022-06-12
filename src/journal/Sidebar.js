import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { startLogOut } from '../actions/auth';
import { noteLogout, startNewNote } from '../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleLogOut=()=>{
    dispatch(startLogOut());
     navigate('/', {
                replace:true
              }) ;
  }
  const {name}=useSelector(state=>state.auth)
  const handleAddNew=()=>{
    dispatch(startNewNote());
  }
  return (
    <aside className='journal__sidebar animate__animated animate__backInLeft'>
        <div className='journal__sidebar-navbar'>
            <h3><i className='fa fa-moon '></i><span>{name}</span></h3>
            <button className='btn' onClick={handleLogOut}>Logout</button>
        </div>
        <div className='journal__new-entry' onClick={handleAddNew}>
          <i className='fa fa-calendar-plus fa-5x '></i>
          <p className='mt-5'>New Entry</p>
        </div>
        <JournalEntries />
    </aside>
  )
}
