import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { Button } from 'react-bootstrap';
import './style.scss';
import Note from './components/note';
import InputBar from './components/input_bar';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      user: null,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  componentDidMount() {
    db.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    db.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  // followed this tutorial to set up Firebase authentication: https://css-tricks.com/firebase-react-part-2-user-authentication/
  login() {
    db.auth.signInWithPopup(db.provider).then((result) => {
      this.setState({
        user: result.user,
      });
    });
  }

  logout() {
    db.auth.signOut().then(() => {
      this.setState({
        user: null,
      });
    });
  }

  addNote(newTitle, name) {
    db.newNote(newTitle, this.state.user.displayName);
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

  renderBody() {
    if (this.state.user != null) {
      return (
        <div>
          <nav>
            <h1>noted.</h1>
            <div id="note-bar">
              <InputBar onNewNote={this.addNote} />
              <span className="lnr lnr-trash" title="Delete all notes" role="button" tabIndex={-1} onClick={this.removeAll} />
              <span className="lnr lnr-exit" role="button" tabIndex={-1} title="logout" onClick={this.logout} />
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
    } else {
      return (
        <div id="canvas">
          <div id="login-box">
            <h1 id="login-title">noted.</h1>
            <h3>A CS52 project</h3>
            <Button bsStyle="info" bsSize="large" onClick={this.login}>Login</Button>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderBody()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
