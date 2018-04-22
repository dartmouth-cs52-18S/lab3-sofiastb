import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import './style.scss';
import Note from './components/note';
import InputBar from './components/input_bar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      index: 0,
    };

    this.updateNotes = this.updateNotes.bind(this);
    this.dragNote = this.dragNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  // set state for notes
  // used this resource to learn how to generate random numbers in JavaScript:
  // https://www.freecodecamp.org/challenges/generate-random-whole-numbers-with-javascript
  updateNotes(newTitle) {
    this.setState({
      notes: this.state.notes.set(
        this.state.index,
        {
          index: this.state.index,
          title: newTitle,
          x: Math.floor(Math.random() * 1400),
          y: Math.floor(Math.random() * 700),
          zIndex: 1 + (this.state.index * 1),
        },
      ),
    });

    this.setState({ index: this.state.index += 1 });
  }

  dragNote(index, x, y) {
    this.setState({
      notes: this.state.notes.update(index, (n) => { return Object.assign({}, n, { x, y }); }),
    });
  }

  deleteNote(index) {
    this.setState({
      notes: this.state.notes.delete(index),
    });
  }

  render() {
    return (
      <div>
        <nav>
          <InputBar onNewNote={this.updateNotes} />
        </nav>
        <div id="notes">
          {/* Code taken from the lab description */}
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (
              <Note id={id} note={note} moveNote={this.dragNote} delete={this.deleteNote} />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
