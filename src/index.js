import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import './style.scss';
import Note from './components/note';
import InputBar from './components/input_bar';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  addNote(newTitle) {
    db.newNote(newTitle);
  }

  dragNote(index, x, y) {
    db.updateXY(index, x, y);
  }

  removeNote(index) {
    db.deleteNote(index);
  }

  newTitle(index, title) {
    db.updateTitle(index, title);
  }

  newContent(index, content) {
    db.updateContent(index, content);
  }

  removeAll() {
    db.deleteAll();
  }

  render() {
    return (
      <div>
        <nav>
          <h1>noted.</h1>
          <div id="note-bar">
            <InputBar onNewNote={this.addNote} />
            <span className="lnr lnr-trash" title="Delete all notes" role="button" tabIndex={-1} onClick={this.removeAll} />
          </div>
        </nav>
        <div id="notes">
          {/* Code taken from the lab description */}
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (
              <Note id={id}
                note={note}
                move={this.dragNote}
                delete={this.removeNote}
                updateTitle={this.newTitle}
                updateContent={this.newContent}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
