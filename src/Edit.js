import React from 'react';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.title || this.props.body,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleInputChange(e) {
    this.setState({ text: e.target.value });
  }

  async handleKeyDown(e) {
    const { id, toggleEditing, onSubmit, type } = this.props;
    const { text } = this.state;

    // Enter
    if (e.keyCode === 13) {
      if (type === 'editTitle') {
        onSubmit(type, { text, id });
      } else if (type === 'editBody') {
        onSubmit(type, { text, id });
      } else {
        return onSubmit(text);
      }
    }

    // Escape
    if (e.keyCode === 27) {
      toggleEditing(type);
    }
  }

  render() {
    const { text, type } = this.state;

    return (
      <div className='edit-component'>
        {type === 'editBody' ? (
          <textarea
            className='body'
            value={text}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            autoFocus={true}
          ></textarea>
        ) : (
          <input
            value={text}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            autoFocus={true}
          ></input>
        )}
      </div>
    );
  }
}
