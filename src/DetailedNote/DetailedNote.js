import React, {Component} from 'react';
import '../App/App.css';
import {Link} from "react-router-dom";
import NotefulContext from "../NotefulContext";

class DetailedNote extends Component {
    static contextType= NotefulContext;
    render() {
        const note = {...this.props.note};
        return (
            <div className='Note'>
                <h3>{note.name}</h3>
                <p>Date modified on {(new Date(note.modified)).toDateString()}</p>
                <p>{note.content}</p>
                <Link to={'/'}> <button onClick={()=> this.context.deleteNote(note.id)}>Delete Note</button></Link>
            </div>
        );
    }
}

export default DetailedNote;
