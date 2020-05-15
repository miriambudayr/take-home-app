import React, { Fragment } from 'react';
import { getNote, updateNote } from './api';
import Edit from './Edit';
import './Note.css';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      body: null,
      id: this.props.match.params.id,
      editingTitle: false,
      editingBody: false,
    };

    this.toggleEditing = this.toggleEditing.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const { id } = this.state;
    let { title, body } = await getNote(id);
    this.setState({
      title,
      body,
      id,
    });
  }

  toggleEditing(type) {
    if (type === 'editBody') {
      this.setState({ editingBody: !this.state.editingBody });
    } else {
      this.setState({ editingTitle: !this.state.editingTitle });
    }
  }

  async onSubmit(type, { text, id }) {
    if (type === 'editBody') {
      await updateNote(parseInt(id), { bodyText: text });
      this.setState({ editingBody: !this.state.editingBody, body: text });
    } else {
      await updateNote(parseInt(id), { titleText: text });
      this.setState({ editingTitle: !this.state.editingTitle, title: text });
    }
  }

  render() {
    const { editingTitle, editingBody, title, body, id } = this.state;

    return (
      <div className='note-page'>
        <div className='note-header'>
          {editingTitle ? (
            <Edit
              type={'editTitle'}
              title={title}
              id={id}
              toggleEditing={this.toggleEditing}
              onSubmit={this.onSubmit}
            />
          ) : (
            <Fragment>
              <h4 onClick={this.toggleEditing}>{title}</h4>
            </Fragment>
          )}
        </div>
        <div>
          {editingBody ? (
            <Edit
              type={'editBody'}
              body={body}
              id={id}
              toggleEditing={this.toggleEditing}
              onSubmit={this.onSubmit}
            />
          ) : (
            <Fragment>
              <input
                className='note-body'
                onClick={() => {
                  this.toggleEditing('editBody');
                }}
                value={body}
              ></input>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
