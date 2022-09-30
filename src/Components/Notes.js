import React, { useContext } from 'react'
import AddNote from './AddNote';
import noteContext from "../Components/Context/notes/noteContext"

import Noteitem from './Noteitem';

const Notes = () => {
   
    // eslint-disable-next-line
    const context = useContext(noteContext);
    const {  notes,addNote } = context;
    return (

        <>
            <AddNote />
            <div className="row my-3">
                <h2>You Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
