import React, {Component} from 'react';
import '../App/App.css';
import './FolderList.css';
import {Link} from "react-router-dom";
import NotefulContext from '../NotefulContext';

class FolderList extends Component {
    static contextType= NotefulContext;
    render() {
        return (
            <>
                {this.context.folders.map((folder) => {
                    return (<div className={(folder.id === this.props.id) ? 'background' : ''}><Link key={folder.id} to={'/folders/' + folder.id}>{folder.name}</Link></div>);
                })
                }
                <button> Add Folder</button>
            </>);
    }
}

export default FolderList;
