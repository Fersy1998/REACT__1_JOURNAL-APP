import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../actions/notes';
export const JournalEntry = (note) => {
    const {id, title, date, body, url} =note;
    const noteDate=moment(date);
    const dispatch=useDispatch();
    const handleEntryClick=()=>{
        dispatch(activeNote(id, note));
    }
  return (
    <div className='journal__entry pointer' onClick={handleEntryClick}>
    
        { url &&
        
        (<div className='journal__entry-picture'
            style={{backgroundSize:'cover',
                backgroundImage:`url(${url})`
            }}
        ></div>)}
        <div className='journal__entry-body'>
            <p className='journal__entry-title'>{title}</p>
            <p className='journal__entry-content'>{body}</p>
        </div>
        <div className='journal__entry-date-box'>
            <span>{noteDate.format('dddd')}</span>
            <p>{noteDate.format('Do')}</p>
        
        </div>
    </div>
  )
}
