import React, {Component} from 'react';
import '../App/App.css';
import './Note.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

class Note extends Component {


    render() {
        return (
            <div className='Note'>
                <Link to={'/notes/' + this.props.id}>
                <h3>{this.props.name}</h3>
                <p>Date modified on {(new Date(this.props.content)).toDateString()}</p>
                </Link>
                <Link to={'/'}> <button onClick={()=> this.props.deleteNote(this.props.id)}>Delete Note</button></Link>
            </div>
        );
    }
}

Note.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    content: PropTypes.string,
    deleteNote: PropTypes.func,
}

export default Note;
