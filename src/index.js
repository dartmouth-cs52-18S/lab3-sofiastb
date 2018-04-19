import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import './style.scss';
import Note from './components/note';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map({
        0: {
          title: 'hi',
          text: 'I is a note',
        },
      }),
    };
  }

  renderNotes() {
    this.state.notes.entrySeq().forEach(([id, note]) => {
      return (
        <Note id={id} note={note} />
      );
    });
  }

  render() {
    return (
      <div id="notes">
        {this.renderNotes()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
