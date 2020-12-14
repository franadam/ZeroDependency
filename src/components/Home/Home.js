import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import {
  FaCalendarAlt,
  FaLink,
  FaMapMarkerAlt,
  FaImage,
  FaPen,
  FaFileAlt,
  FaUser,
} from 'react-icons/all';

import classes from './Home.module.css';

import {
  fetchUsers,
  deleteUserInfo,
  fetchPosts,
  fetchTodos,
} from '../../store/actions';
import Collapsible from '../Collapsible/Collapsible';
import { Link } from 'react-router-dom';

export class UnconnectedHome extends Component {
  componentDidMount() {
    this.props.onFetchUsers();
    this.props.onFetchPosts();
    this.props.onFetchTodos();
  }

  render() {
    const { users, posts, todos, onDeleteUser } = this.props;

    const colls = users
      ? users.map((user) => {
          const userPosts = posts.filter((p) => p.userId === user.id);

          const userTodos = todos.filter((p) => p.userId === user.id);

          const postsArr = userPosts.map((p) => (
            <div
              className={classes.collapsible__content}
              key={`${p.id}_${uuidv4()}`}
            >
              <FaFileAlt />
              <p>{p.title}</p>
            </div>
          ));

          const content = (
            <>
              <div className={classes.collapsible__link}>
                <Link to={`users/${user.id}`}>
                  Clik here to See more on the profile
                </Link>
              </div>
              {userPosts.length === 0 ? (
                <p>{user.name} has not written any article yet</p>
              ) : (
                postsArr
              )}
            </>
          );

          return (
            <Collapsible
              key={`${user.username}_${uuidv4()}`}
              name={user.name}
              link={`users/${user.id}`}
              post={userPosts.length}
              todo={userTodos.length}
              type="user"
              content={content}
              delete={() => onDeleteUser(user.id)}
            />
          );
        })
      : [];

    return (
      <div data-test="component-home" className={classes.main}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Users</h1>
          {colls}
          <Link to={`users/add`} className={classes.add}>
            <FaUser />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  posts: state.post.posts,
  todos: state.todo.todos,
  errors: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchUsers: () => dispatch(fetchUsers()),
  onDeleteUser: (userID) => dispatch(deleteUserInfo(userID)),
  onFetchPosts: () => dispatch(fetchPosts()),
  onFetchTodos: () => dispatch(fetchTodos()),
});

UnconnectedHome.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  posts: PropTypes.arrayOf(PropTypes.object),
  todos: PropTypes.arrayOf(PropTypes.object),
  errors: PropTypes.object,
  onFetchUsers: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onFetchTodos: PropTypes.func,
  onFetchPosts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedHome);
