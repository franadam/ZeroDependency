import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import { createPost } from '../../store/actions/';

import formStyle from '../FormFiled/FormField.module.css';
import classes from './Post.module.css';
import Modal from '../Modal/Modal';

export class Post extends Component {
  state = {
    formError: false,
    title: '',
    body: '',
  };

  componentDidMount() {}

  inputHandler(event) {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  formHandler(event) {
    event.preventDefault();

    const id = uuidv4();

    const post = {
      userId: this.props.userID,
      id,
      title: this.state.title,
      body: this.state.body,
    };

    if (this.state.title && this.state.body) {
      this.props.onCreatePost(post);
    } else {
      this.setState({ formError: true });
      document.getElementById('modal').style.display = 'block';
    }

    this.setState({
      title: '',
      body: '',
    });
  }

  render() {
    return (
      <div className={classes.main}>
        <h1 className={classes.title}>Create a Post</h1>
        <form onSubmit={this.formHandler}>
          <div className={formStyle.main}>
            <label className={formStyle.label}>Title</label>
            <input
              id="title"
              className={formStyle.fInput}
              name="title"
              type="text"
              onChange={(event) => this.inputHandler(event)}
              value={this.state.title}
            />
          </div>
          <div className={formStyle.main}>
            <label className={formStyle.label}>Body</label>
            <textarea
              id="body"
              className={formStyle.fInput}
              name="body"
              type="text"
              onChange={(event) => this.inputHandler(event)}
              value={this.state.body}
            />
          </div>
          <button
            className={`${formStyle.btn}`}
            type="submit"
            onClick={(event) => this.formHandler(event)}
          >
            Submit
          </button>
        </form>
        {this.state.formError ? (
          <p className={classes.error}>Please fill all fields properly</p>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ error }) => ({
  error: error.posts,
});
const mapDispatchToProps = (dispatch) => ({
  onCreatePost: (post) => dispatch(createPost(post)),
});

Post.propTypes = {
  userID: PropTypes.string,
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  error: PropTypes.object,
  newTweet: PropTypes.object,
  tweets: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
  onCreatePost: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
