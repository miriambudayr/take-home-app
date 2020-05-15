import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getNotes, createNote, deleteNote } from './api';
import PageNavigation from './PageNavigation';
import Edit from './Edit';
import './List.css';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      pageCount: 1,
      notesList: [],
      editing: false,
      redirect: null,
    };

    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const currentPage = parseInt(match.params.page) || 1;

    try {
      const notes = await getNotes(currentPage);
      this.setState({
        notesList: notes._embedded.notes,
        pageCount: this.getPageCount(notes.total),
        currentPage,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidUpdate(previousProps) {
    if (previousProps === this.props) return;
    const { match } = this.props;
    const currentPage = parseInt(match.params.page) || 1;

    try {
      const notes = await getNotes(currentPage);

      this.setState({
        notesList: notes._embedded.notes,
        pageCount: this.getPageCount(notes.total),
        currentPage: currentPage,
        redirect: null,
      });
    } catch (err) {
      console.log(err);
    }
  }

  getPageCount(length) {
    let pageCount = length / 4;
    if (length % 4 > 0) pageCount++;
    return Math.floor(pageCount);
  }

  async handleDeleteNote(id) {
    try {
      await deleteNote(id);
      const { currentPage } = this.state;
      const notes = await getNotes(currentPage);
      let newPageCount = this.getPageCount(notes.total);
      let redirect;

      if (newPageCount < currentPage) {
        redirect = `/${currentPage - 1}`;
      }

      this.setState({
        notesList: notes._embedded.notes,
        pageCount: newPageCount,
        redirect: redirect || null,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async handleAddNote(text) {
    const { currentPage } = this.state;

    try {
      await createNote(text);
      const notes = await getNotes(currentPage);
      let newPageCount = this.getPageCount(notes.total);

      this.setState({
        notesList: notes._embedded.notes,
        pageCount: newPageCount,
      });
    } catch (err) {
      console.log(err);
    }
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
  }

  onSubmit(text) {
    this.handleAddNote(text);
    this.setState({ editing: !this.state.editing, title: text });
  }

  render() {
    const { notesList, pageCount, currentPage, editing, redirect } = this.state;
    if (redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className='list-container'>
        <h1>My Notes</h1>
        <div className='add-note'>
          {editing ? (
            <Edit
              className='note-title'
              type={'addNote'}
              toggleEditing={this.toggleEditing}
              onSubmit={this.onSubmit}
            />
          ) : (
            <input
              onClick={this.toggleEditing}
              placeholder={'Add note title...'}
            ></input>
          )}
        </div>

        <ul className='list-group list-group-flush'>
          {notesList.map((note) => (
            <li className='list-group-item note-item'>
              <span></span>
              <Link
                key={note.id}
                className='note-item btn btn-sm d-inline-block align-center'
                to={`/note/${note.id}`}
              >
                {note.title}
              </Link>
              <a
                className='btn btn-sm btn-outline-primary float-right d-inline-block align-center'
                onClick={async () => {
                  await this.handleDeleteNote(note.id);
                }}
              >
                &times;
              </a>
            </li>
          ))}
        </ul>
        {pageCount > 1 ? (
          <PageNavigation
            pageCount={pageCount}
            handlePageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    );
  }
}
