import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaLink, FaMapMarkerAlt, FaPen } from 'react-icons/all';

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
} from '../../store/actions';

export class Profile extends Component {
  componentDidMount() {
    this.props.onReadUser(this.props.match.params.userID);
    this.props.onFetchUserPosts(this.props.match.params.userID);
    this.props.onFetchUserAlbums(this.props.match.params.userID);
    this.props.onFetchUserTodos(this.props.match.params.userID);
    console.log('this.props.match :>> ', this.props.match.params.userID);
  }

  modalHandler = () => {
    const modal = document.getElementById('modal');
    console.log('modal :>> ', modal);
    modal.style.display = 'block';
  };

  render() {
    const { currentUser, posts, albums, todos, match } = this.props;
    const userID = match.params.userID;
    const infosJX = (
      <div className={classes.header}>
        {currentUser !== undefined ? (
          <>
            <h1>{currentUser.name}</h1>
            <div className={classes.infos}>
              <p className={classes.info__username}>@{currentUser.username}</p>
              <div className={classes.place}>
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
                <p>
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
                  key={post.id}
                  title={post.title}
                  body={post.body}
                  link1={'#'}
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
                key={todo.id}
                name={todo.title}
                content={todo.title}
                completed={todo.completed}
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
            <FaPen />
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
    onDeletePost: (postID) => dispatch(deletePost(postID)),
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
