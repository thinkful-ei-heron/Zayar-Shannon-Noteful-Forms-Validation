import React, {Component} from 'react';
import '../App/App.css';
import Note from "../Note/Note";

class NotesList extends Component {
    render() {
        const currentFolderID = this.props.folderId;
        let notes = this.props.notes;
        if(currentFolderID) {
            notes = this.props.notes.filter((note) => note.folderId === (currentFolderID));
        }
        return <>
            {notes.map(note =>
                <Note key={note.id} id={note.id} name={note.name} content={note.modified}/>
            )}
        </>;
    }
}

export default NotesList;
