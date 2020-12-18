import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaLink, FaMapMarkerAlt, FaPen } from 'react-icons/all';

import Card from '../Card/Card';
import Collapsible from '../Collapsible/Collapsible';
import Modal from '../../hoc/Modal/Modal';
import Post from '../Post/Post';

import classes from './Profile.module.css';

import { objectToArray } from '../../utils/stateTransforation';

import {
  deletePost,
  fetchPosts,
  deleteTodo,
  fetchUsers,
  fetchTodos,
} from '../../store/actions';

export class Profile extends Component {
  componentDidMount() {
    this.props.onFetchTodos();
    this.props.onFetchUsers();
    this.props.onFetchPosts();
  }

  modalHandler = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  };

  render() {
    const { user, post, todo, match } = this.props;
    const userID = match.params.userID;

    const currentUser = user.byId[userID];
    const userPosts = objectToArray(userID, post);
    const userTodos = objectToArray(userID, todo);

    const infosJX = (
      <div className={classes.header}>
        {currentUser !== undefined ? (
          <>
            <h1 className={classes.name}>{currentUser.name}</h1>
            <Link to={`${userID}/edit`} className={classes.edit}>
              <FaPen />
            </Link>
            <p className={classes.username}>@{currentUser.username}</p>
            <div className={classes.info}>
              {currentUser.address ? (
                <p>
                  <FaMapMarkerAlt /> {currentUser.address.city}
                </p>
              ) : null}
              {currentUser.company ? (
                <p className={classes.company}>
                  Company: {currentUser.company.name}
                </p>
              ) : null}
              <p className={classes.website}>
                <FaLink />{' '}
                <a
                  href={currentUser.website}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {currentUser.website}
                </a>
              </p>
            </div>
          </>
        ) : null}
      </div>
    );
    const postsJX = (
      <div>
        <h2>Posts</h2>
        <div className={classes.posts}>
          {userPosts.map((post) => (
            <Card
              key={`${post.id}_${uuidv4()}`}
              title={post.title}
              body={post.body}
              delete={() => this.props.onDeletePost(post.id)}
            />
          ))}
        </div>
      </div>
    );
    const todosJX = (
      <div className={classes.albums}>
        <h2>Todos</h2>
        {userTodos.map((todo) => (
          <Collapsible
            key={`${todo.id}_${uuidv4()}`}
            name={todo.title}
            content={<p key={`${uuidv4()}_${todo.id}`}>{todo.title}</p>}
            completed={todo.completed}
            delete={() => this.props.onDeleteTodo(todo.id)}
          />
        ))}
      </div>
    );
    return (
      <div className={classes.main}>
        <div className={classes.wrapper}>
          {infosJX}
          {postsJX}
          {todosJX}
          <Modal>
            <Post userID={userID} />
          </Modal>
          <button
            className={classes.btn}
            type="button"
            onClick={() => this.modalHandler()}
          >
            <FaEdit />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, error, post, todo }) => ({
    errors: error,
    user,
    post,
    todo,
  }),
  mapDispatchToProps = (dispatch) => ({
    onFetchTodos: () => dispatch(fetchTodos()),
    onFetchPosts: () => dispatch(fetchPosts()),
    onFetchUsers: () => dispatch(fetchUsers()),
    onDeletePost: (postID) => dispatch(deletePost(postID)),
    onDeleteTodo: (userID) => dispatch(deleteTodo(userID)),
  });

Profile.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  errors: PropTypes.object,
  user: PropTypes.object,
  post: PropTypes.object,
  todo: PropTypes.object,
  onFetchTodos: PropTypes.func,
  onDeletePost: PropTypes.func,
  onFetchPosts: PropTypes.func,
  onFetchUsers: PropTypes.func,
  onDeleteTodo: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
