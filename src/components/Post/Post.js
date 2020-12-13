import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createPost } from '../../store/actions/';

import classes from '../FormFiled/FormField.module.css';

export class Post extends Component {
  state = {
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

    const post = {
      userId: this.props.userID,
      id: 9999,
      title: this.state.title,
      body: this.state.body,
    };

    this.props.onCreatePost(post);

    this.setState({
      title: '',
      body: '',
    });
  }

  render() {
    return (
      <div>
        <h1>Create a Post</h1>
        <form onSubmit={this.formHandler}>
          <div>
            <label>Title</label>
            <input
              id="title"
              className={classes.fInput}
              name="title"
              type="text"
              onChange={(event) => this.inputHandler(event)}
              value={this.state.title}
            />
          </div>
          <div>
            <label>Body</label>
            <textarea
              id="body"
              className={classes.fInput}
              name="body"
              type="text"
              onChange={(event) => this.inputHandler(event)}
              value={this.state.body}
            />
          </div>
          <button type="submit" onClick={(event) => this.formHandler(event)}>
            Submit
          </button>
        </form>
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
