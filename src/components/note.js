import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.note.title,
      text: this.props.note.text,
      x: this.props.note.x,
      y: this.props.note.y,
      zIndex: this.props.note.zIndex,
    };
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        // grid={[25, 25]}
        defaultPosition={{ x: this.state.x, y: this.state.y }}
        zIndex={this.state.zIndex}
        // position={position} {/*looks like {x, y, width, height*/}
        // onStart={this.onStartDrag}
        // onDrag={this.onDrag}
        // onStop={this.onStopDrag}
      >
        <div className="note">
          <h1>{this.state.title}</h1>
          <p>{this.state.text}</p>
        </div>
      </Draggable>
    );
  }
}

export default Note;
