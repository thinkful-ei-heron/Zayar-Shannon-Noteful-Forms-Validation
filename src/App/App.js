import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom'
import './App.css';
import FolderList from "../FolderList/FolderList";
import NoteList from "../NoteList/NoteList";
import AddNote from '../AddNote/AddNote';
import DetailedNote from "../DetailedNote/DetailedNote";
import NotefulContext from '../NotefulContext';
import ErrorBoundary from '../ErrorBoundary';
import cuid from 'cuid';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        addingNote: false,
        errors: null
    };

    addNote = (newNoteName, newNoteContent, folderId) => {
        const date = new Date();
        const newNoteObj = {
            id: cuid(),
            name: newNoteName,
            modified: date.toDateString(),
            folderId: folderId,
            content: newNoteContent,
        }

        const newNoteJson = JSON.stringify(newNoteObj);
        fetch('http://localhost:9090/notes',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: newNoteJson
        }
    ).then(resp => {
        if (resp.ok) {

            return resp.json()
        } else {throw new Error(resp.status)}
    }).then(data => this.setState({
        notes:
            [...this.state.notes, data]
    })).then(()=> this.setState({addingNote:false}))
        .catch(err => { throw new Error(err) })
}


    addFolder = folderName => {
        const newObj = {
            id: cuid(),
            name: folderName,
        }
        const finalObj = JSON.stringify(newObj)
        fetch('http://localhost:9090/folders',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: finalObj
            }
        ).then(resp => {
            if (resp.ok) {

                return resp.json()
            } else {throw new Error(resp.status)}
        }).then(data => this.setState({
            folders:
                [...this.state.folders, data]
        }))
            .catch(err => { throw new Error(err) })
    }

    componentDidMount() {
        fetch('http://localhost:9090/folders').then(res => res.json()).then(data => this.setState({folders: data}));
        fetch('http://localhost:9090/notes').then(res => res.json()).then(data => this.setState({notes: data}));
    }

    deleteNote = (id) => {

        fetch(`http://localhost:9090/notes/${id}`, {
            method: 'DELETE'
        }).then(() => this.setState({notes: this.state.notes.filter(note => note.id !== id)}));
    };

    render() {
        return (

            <NotefulContext.Provider value={{
                notes: this.state.notes,
                folders: this.state.folders,
                deleteNote: this.deleteNote,
                addFolder: this.addFolder,
                addNote: this.addNote,
                errors: this.state.errors

            }}>


                <div className="App">
                    <div className="App-header">
                        <Link to='/'>Noteful </Link>
                        {this.state.errors && <p>{this.state.errors}</p>}

                    </div>
                    <ErrorBoundary>
                    <div className='SideNav'>
                        <Switch>
                            <Route path='/notes/:noteId' render={(routeProps) => {
                                const note = this.state.notes.find(note => note.id === routeProps.match.params.noteId);
                                if (note) {
                                    const folder = {...this.state.folders.find(folder => folder.id === note.folderId)};
                                    return (
                                        <div>
                                            <div>{folder.name}</div>
                                            <Link to={'/folders/' + folder.id}>Go Back To</Link>
                                        </div>)
                                }
                            }}/>
                            <Route path='/folders/:folderId'
                                   render={(routeProps) => <FolderList
                                       id={routeProps.match.params.folderId}/>}/>
                            <Route exact path='/' render={(routeProps) => <FolderList/>}/>
                        </Switch>
                    </div>
                    <div className='Main'>
                        <Switch>
                            <Route path='/notes/:noteId' render={(routeProps) => <DetailedNote
                                note={this.state.notes.find(note => note.id === routeProps.match.params.noteId)}/>}/>
                            <Route path='/folders/:folderId'
                                    render={(routeProps) => <NoteList folderId={routeProps.match.params.folderId}
                                   />}/>
                            <Route exact path='/' render={(routeProps) => <NoteList/>}/>
                        </Switch>

                        <button onClick={()=>this.setState({addingNote:true})}> Add Note</button>
                        {this.state.addingNote && <AddNote />}

                </div>
                </ErrorBoundary>
                </div>

            </NotefulContext.Provider>

        )
    }
}

export default App;
