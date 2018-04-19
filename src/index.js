import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import Note from './components/note';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };
  }

  render() {
    return (
      <div id="notes">
        <Note />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
