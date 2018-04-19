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
          // x: 400,
          // y: 12,
        },
      }),
    };
  }

  render() {
    return (
      <div id="notes">
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note id={id} note={note} />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
