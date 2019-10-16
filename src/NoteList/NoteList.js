import React, {Component} from 'react';
import '../App/App.css';
import Note from "../Note/Note";
import NotefulContext from '../NotefulContext';

class NotesList extends Component {
    static contextType= NotefulContext;
    render() {
        const currentFolderID = this.props.folderId;
        let notes = this.context.notes;
        if(currentFolderID) {
            notes = this.context.notes.filter((note) => note.folderId === (currentFolderID));
        }
        return <>
            {notes.map(note =>
                <Note key={note.id} id={note.id} name={note.name} content={note.modified}/>
            )}
        </>;
    }
}

export default NotesList;
