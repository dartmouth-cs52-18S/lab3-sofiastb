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
  createNewNote(e) {
    e.preventDefault(); // stopping reload on submit was done with this StackOverflow post: https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit
    // pass title to parent
    this.props.onNewNote(this.state.text);
    // clear input field
    this.setState({ text: '' });
  }

  render() {
    return (
      // submitting for with React-Bootstrap was done with this StackOverflow post: https://stackoverflow.com/questions/37239799/can-not-submit-form-react-bootstrap
      <form onSubmit={this.createNewNote}>
        <FormGroup id="input">
          <InputGroup>
            <FormControl type="text" placeholder="Type anything to make it a note!" onChange={this.onInputChange} value={this.state.text} />
            <InputGroup.Button>
              <Button type="submit">New Note</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

export default InputBar;
