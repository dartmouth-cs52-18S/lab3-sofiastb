import React, { Component } from 'react';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.note.title,
      text: this.props.note.text,
      // x: 400,
      // y: 12,
      // zIndex: 26,
    };

    this.hi().bind(this);
  }

  hi() {
    console.log(this.state.note.title);
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
