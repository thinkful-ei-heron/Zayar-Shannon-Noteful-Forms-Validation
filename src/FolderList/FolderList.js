import React, {Component} from 'react';
import '../App/App.css';
import './FolderList.css';
import AddFolder from './AddFolder';
import {Link} from "react-router-dom";
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';

class FolderList extends Component {
    static contextType = NotefulContext;
    state = {
        addingFolder: {add: false},
    }



    handleAddFolder = (event) => {
        try {
            event.preventDefault();
            const newFolderName = document.getElementById('addfolder-input').value

            this.context.addFolder(newFolderName)
            //API stuff
            this.setState({
                addingFolder: false

            })
        } catch(error){
            throw new Error(error)
        }

    }

    render() {

        return (
            <div className="folderlist">
                {this.context.folders.map((folder) => {
                    return (<div key={folder.id} className={(folder.id === this.props.id) ? 'background' : ''}><Link key={folder.id} to={'/folders/' + folder.id}>{folder.name}</Link></div>);
                    })
                }
                {!this.state.addingFolder.add &&
                    (<button onClick={() =>
                    this.setState({ addingFolder: { add: true } })}
                        >Add Folder</button>)
                }
                {this.state.addingFolder.add &&
                    (<AddFolder handleAddFolder={this.handleAddFolder} />)
                }
            </div>);
    }
}

FolderList.propTypes = {
    id: PropTypes.string
}

export default FolderList;
