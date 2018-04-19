import React, { Component } from 'react';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.note.title,
      text: this.props.note.text,
      // x: this.props.note.x,
      // y: this.props.note.y,
      // zIndex: 26,
    };
  }

  render() {
    return (
      <div className="note">
        <h1>{this.state.title}</h1>
        <p>{this.state.text}</p>
      </div>
    );
  }
}

export default Note;
