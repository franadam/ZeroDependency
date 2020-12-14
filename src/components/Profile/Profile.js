import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
  FaCalendarAlt,
  FaEdit,
  FaLink,
  FaMapMarkerAlt,
  FaPen,
} from 'react-icons/all';

import Card from '../Card/Card';
import Collapsible from '../Collapsible/Collapsible';
import Modal from '../Modal/Modal';
import Post from '../Post/Post';

import classes from './Profile.module.css';
import {
  readUserInfo,
  fetchUserPosts,
  fetchUserAlbums,
  fetchUserTodos,
  deletePost,
  fetchPosts,
  deleteUserTodo,
} from '../../store/actions';

export class Profile extends Component {
  componentDidMount() {
    this.props.onReadUser(this.props.match.params.userID);
    this.props.onFetchUserPosts(this.props.match.params.userID);
    this.props.onFetchUserAlbums(this.props.match.params.userID);
    this.props.onFetchUserTodos(this.props.match.params.userID);
    this.props.onFetchPosts();
  }

  modalHandler = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  };

  render() {
    const { currentUser, posts, albums, todos, match } = this.props;
    const userID = match.params.userID;
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
            </div>
          </>
        ) : null}
      </div>
    );
    const postsJX = (
      <div>
        <h2>Posts</h2>
        <div className={classes.posts}>
          {posts != undefined
            ? posts.map((post) => (
                <Card
                  key={`${post.id}_${uuidv4()}`}
                  title={post.title}
                  body={post.body}
                  delete={() => this.props.onDeletePost(post.id)}
                />
              ))
            : []}
        </div>
      </div>
    );
    const todosJX = (
      <div className={classes.albums}>
        <h2>Todos</h2>
        {todos != undefined
          ? todos.map((todo) => (
              <Collapsible
                key={`${todo.id}_${uuidv4()}`}
                name={todo.title}
                content={<p key={`${uuidv4()}_${todo.id}`}>{todo.title}</p>}
                completed={todo.completed}
                delete={() => this.props.onDeleteUserTodo(todo.id)}
              />
            ))
          : []}
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

const mapStateToProps = ({ user, error }) => ({
    errors: error,
    users: user.users,
    posts: user.posts,
    albums: user.albums,
    todos: user.todos,
    currentUser: user.user,
  }),
  mapDispatchToProps = (dispatch) => ({
    onReadUser: (userID) => dispatch(readUserInfo(userID)),
    onFetchUserPosts: (userID) => dispatch(fetchUserPosts(userID)),
    onFetchUserAlbums: (userID) => dispatch(fetchUserAlbums(userID)),
    onFetchUserTodos: (userID) => dispatch(fetchUserTodos(userID)),
    onFetchPosts: () => dispatch(fetchPosts()),
    onDeletePost: (postID) => dispatch(deletePost(postID)),
    onDeleteUserTodo: (userID) => dispatch(deleteUserTodo(userID)),
  });

Profile.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  errors: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object),
  posts: PropTypes.arrayOf(PropTypes.object),
  albums: PropTypes.arrayOf(PropTypes.object),
  todos: PropTypes.arrayOf(PropTypes.object),
  onReadUser: PropTypes.func,
  onFetchUserPosts: PropTypes.func,
  onFetchUserAlbums: PropTypes.func,
  onFetchUserTodos: PropTypes.func,
  onDeletePost: PropTypes.func,
  onFetchPosts: PropTypes.func,
  onDeleteUserTodo: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
