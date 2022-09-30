import React, { useContext, useState } from 'react'
import noteContext from "../Components/Context/notes/noteContext"


const Noteitem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;


    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">

                        <h5 className="card-title mx-1">{note.title}</h5>
                        <i className="fa-solid fa-file-pen mx-1" onClick={() => { editNote(note._id, note.description, note.tag) }} ></i>
                        <i className="fa-solid fa-trash mx-1" onClick={() => { deleteNote(note._id) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem
