import React, { Component } from 'react'

export default class AddFolder extends Component {
  state = {
    newFolderName: null,
    touched: false,
  }

  validateName() {
    if (!this.state.newFolderName && this.state.touched) {
      return 'New Folder Must Have a Name';
    }
  }
  setFolder(value){
    console.log(value);
    this.setState({
      newFolderName: value,
      touched:true,
    })
  }

  render() {
    return (
      <form className="addfolder" id="addfolder">
        <label htmlFor="addfolder-input">Add a folder
        <p className='error'> {this.validateName()}</p>
        </label>
        <input className="addfolder-input" id="addfolder-input" name="newFolderName" onChange={(e) => this.setFolder(e.target.value)} type='text' required></input>
        <button disabled={this.validateName() || !this.state.touched} onClick={(e) => { this.props.handleAddFolder(e) }} type="button">Add</button>
      </form>
    )
  }
}
