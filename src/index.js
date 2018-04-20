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
      defaultX: 400,
      defaultY: 125,
      zIndex: 1,
    };

    this.updateNotes = this.updateNotes.bind(this);
  }

  // set state for notes
  updateNotes(newTitle) {
    this.setState({
      notes: this.state.notes.set(
        this.state.index,
        {
          title: newTitle,
          x: this.state.defaultX,
          y: this.state.defaultY,
          zIndex: this.state.zIndex,
        },
      ),
    });
    this.setState({ index: this.state.index += 1 });
    this.setState({ defaultX: this.state.defaultX += 30 });
    this.setState({ defaultY: this.state.defaultY += 30 });
    this.setState({ zIndex: this.state.zIndex += 1 });
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
