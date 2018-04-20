import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

class InputBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
  }

  onInputChange(event) {
    this.setState({ text: event.target.value });
  }

  // passing the data to index.js was done with the help of this StackOverflow post: https://stackoverflow.com/questions/38394015/how-to-pass-data-from-child-component-to-its-parent-in-reactjs
  createNewNote() {
    // pass title to parent
    const title = this.state.text;
    this.props.onNewNote(title);
    // clear input field
    this.setState({ text: '' });
  }

  render() {
    return (
      <FormGroup id="input">
        <InputGroup>
          <FormControl type="text" placeholder="Type anything to make it a note!" onChange={this.onInputChange} value={this.state.text} />
          <InputGroup.Button>
            <Button onClick={this.createNewNote} >New Note</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default InputBar;
