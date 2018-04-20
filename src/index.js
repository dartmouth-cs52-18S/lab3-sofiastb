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
      notes: Immutable.Map({ }),
      index: 0,
    };

    this.updateNotes = this.updateNotes.bind(this);
  }

  updateNotes(newTitle) {
    this.setState({ notes: this.state.notes.set(this.state.index, { title: newTitle }) });
    this.setState({ index: this.state.index += 1 });
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
              <Note id={id} note={note} />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
