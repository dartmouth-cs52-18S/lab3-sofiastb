import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';
import { FormGroup, FormControl } from 'react-bootstrap';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };

    this.move = this.move.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  onContentChange(event) {
    event.preventDefault();
    this.props.updateContent(this.props.id, event.target.value);
  }

  onTitleChange(event) {
    event.preventDefault();
    this.props.updateTitle(this.props.id, event.target.value);
  }

  // sets editing status
  edit(event) {
    event.preventDefault();
    if (this.state.isEditing) {
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true });
    }
  }

  move(e, ui) {
    this.props.move(this.props.id, ui.x, ui.y);
  }

  delete(event) {
    event.preventDefault();
    this.props.delete(this.props.id);
  }

  // chose to go with an input field for the title based off of this StackOverflow post:
  // https://stackoverflow.com/questions/21698065/whats-the-difference-between-textarea-and-input-type-text-in-angularjs
  renderTitle() {
    if (this.state.isEditing) {
      return (
        <form className="note-title-form editing">
          <FormGroup className="title-form">
            <FormControl
              type="text"
              value={this.props.note.title}
              onChange={this.onTitleChange}
            />
          </FormGroup>
        </form>
      );
    } else {
      return <h2>{this.props.note.title}</h2>;
    }
  }

  // update body
  renderBody() {
    if (this.state.isEditing) {
      return <Textarea className="content editing" onChange={this.onContentChange} value={this.props.note.content} />;
    } else {
      return <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.props.note.content || '') }} />;
    }
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        zIndex={this.props.zIndex}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.move}
        nStop={this.onStopDrag}
        cancel=".editing" // canceling drag on edit was done with the help of the draggable docs: https://github.com/mzabriskie/react-draggable#draggable
      >
        <div className="note note-mover" style={{ backgroundColor: this.props.note.backgroundColor }}>
          <div className="note-header">
            {this.renderTitle()}
            <div className="buttons">
              <span className="lnr lnr-pencil" role="button" tabIndex={-1} onClick={this.edit} />
              <span className="lnr lnr-cross" role="button" tabIndex={-1} onClick={this.delete} />
            </div>
          </div>
          <div className="note-body">
            <p className="author">By: {this.props.note.author}</p>
            {this.renderBody()}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Note;
