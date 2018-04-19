import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'testing',
      text: 'I is a note',
      // x: 400,
      // y: 12,
      // zIndex: 26,
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.text}</p>
      </div>
    );
  }
}

ReactDOM.render(<Note />, document.getElementById('main'));
