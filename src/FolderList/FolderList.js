import React, {Component} from 'react';
import '../App/App.css';
import './FolderList.css';
import AddFolder from './AddFolder';
import {Link} from "react-router-dom";
import NotefulContext from '../NotefulContext';

class FolderList extends Component {
    static contextType = NotefulContext;
    state = {
        addingFolder: {add: false},
    }



    handleAddFolder = (event) => {
        event.preventDefault();
        const newFolderName = document.getElementById('addfolder-input').value

        this.context.addFolder(newFolderName)
        //API stuff
        this.setState({
            addingFolder: false

        })
    }

    render() {
        return (
            <>
                {this.context.folders.map((folder) => {
                    return (<div key={folder.id} className={(folder.id === this.props.id) ? 'background' : ''}><Link key={folder.id} to={'/folders/' + folder.id}>{folder.name}</Link></div>);
                    })
                }
                {!this.state.addingFolder &&
                    (<button onClick={() =>
                    this.setState({ addingFolder: { add: true } })}
                        >Add Folder</button>)
                }
                {this.state.addingFolder &&
                    (<AddFolder handleAddFolder={this.handleAddFolder} />)
                }
            </>);
    }
}

export default FolderList;
