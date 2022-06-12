import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote=()=>{
    return async(dispatch, getState)=>{
        const uid=getState().auth.uid;
        const newNote={
            title:'',
            body:'',
            date:new Date().getTime(),
            url:''
        }
       
        try {
            const doc= await db.collection(`${uid}/journal/notes`).add(newNote);
            dispatch(activeNote(doc.id, newNote));
        } catch (error) {
            return error;
        }
        
        //dispatch(AddNewNote(doc.id, newNote));
        //dispatch(setNotes(getState().notes.notes));
    }
}

export const activeNote=(id, note)=>({
    type: types.notesActive,
    payload:{
        id,
        ...note
    }
})
export const startLoadingNotes=(uid)=>{
    return async (dispatch)=>{
        const notes=await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}
export const setNotes=(notes)=>({
    type:types.notesLoad,
    payload:notes
})

export const startSaveNotes=(note)=>{
    return async(dispatch, getState)=>{
        const uid=getState().auth.uid;
        let noteToFirestore={...note};
        if(!note.url){
            delete note.url;
        }
        delete noteToFirestore.id;
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        dispatch(deleteNote(note.id));
        dispatch(AddNewNote(note.id, {...note} ));
        dispatch(activeNote(note.id, {...note} ));
        Swal.fire('Saved', note.title, 'success' );
    }
}
export const AddNewNote=(id, note)=>({
    type:types.notesAddNew,
    payload:{
        id, ...note
    }
    
    })

//Recarga la nota editada solamente
export const refreshNote=(id, note)=>({
    type:types.notesUpdated,
    payload:{
        id,
        note:{
            ...note
        }
    }
})

export const startUploading=(file)=>{
    return async (dispatch, getState)=>{
        const {active: activenote}=getState().notes;
        Swal.fire({
            title:'Uploading',
            html:'<p>Please wait...</p>',
            allowOutsideClick:false,
            
        })
        const fileURL= await fileUpload(file);
        //console.log(fileURL);
        activeNote.url=fileURL;
        dispatch(startSaveNotes({...activenote, url:fileURL}));
        dispatch(refreshNote(activeNote.id, {...activeNote, url:fileURL} ));
        
        Swal.close();
    }
}
export const startDeleting=(id)=>{
    return async (dispatch, getState)=>{
        const {uid}=getState().auth;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id));
    }
}

export const deleteNote=(id)=>({
    type:types.notesDelete,
    payload: id
})
export const noteLogout=()=>({
    type:types.notesLogOutCleaning,
})