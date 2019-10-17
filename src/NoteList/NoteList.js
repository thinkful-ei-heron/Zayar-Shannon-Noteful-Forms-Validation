import React, {Component} from 'react';
import '../App/App.css';
import Note from "../Note/Note";
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';

class NoteList extends Component {
    static contextType= NotefulContext;

    render() {
        const currentFolderID = this.props.folderId;
        let notes = this.context.notes;
        if(currentFolderID) {
            notes = this.context.notes.filter((note) => note.folderId === (currentFolderID));
        }
        return <>
            {notes.map(note =>
                <Note key={note.id} id={note.id} name={note.name} deleteNote={this.context.deleteNote} content={note.modified}/>
            )}
        </>;
    }
}

NoteList.propTypes = {
    folderId: PropTypes.string,
}

export default NoteList;
