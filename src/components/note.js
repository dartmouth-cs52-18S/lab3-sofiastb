import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);

    this.moveNote = this.moveNote.bind(this);
  }

  moveNote(e, ui) {
    this.props.moveNote(this.props.note.index, ui.x, ui.y);
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        zIndex={this.props.zIndex}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.moveNote}
        nStop={this.onStopDrag}
      >
        <div className="note note-mover">
          <div className="note-title">
            <h1>{this.props.note.title}</h1>
          </div>
          <div className="note-body">
            <p>{this.props.note.text}</p>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
