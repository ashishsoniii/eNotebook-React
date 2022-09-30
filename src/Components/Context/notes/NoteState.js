import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "61322f19553781a8ca8d0e06",
      "user": "6131dc5e3e4037cd4734a066",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2021-09-03T14:20:09.509Z",
      "__v": 0
    },
    {
      "_id": "61322f19553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a066",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    }

  ]



  const [notes, setNotes] = useState(notesInitial)

  // Add a Note
  const addNote = (title, description, tag) => {
    // To do api call
    console.log("Adding  a New note!")
    const note = {
      "_id": "61322f19553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a066",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }
  // Delete a Note
  const deleteNote = (id) => {
    console.log("Deleting node with id " + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;