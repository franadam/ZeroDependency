import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { FaRegClipboard, FaRegFileAlt, FaUser } from 'react-icons/all';

import classes from './Home.module.css';

import {
  fetchUsers,
  deleteUserInfo,
  fetchPosts,
  fetchTodos,
} from '../../store/actions';
import Collapsible from '../Collapsible/Collapsible';
import { Link } from 'react-router-dom';
import { objectToArray } from '../../utils/stateTransforation';

export class UnconnectedHome extends Component {
  componentDidMount() {
    this.props.onFetchUsers();
    this.props.onFetchPosts();
    this.props.onFetchTodos();
  }

  render() {
    const {
      user: userState,
      post: postState,
      todo: todoState,
      onDeleteUser,
    } = this.props;

    let colls = [];
    if (userState && userState.byId) {
      for (let userId in userState.byId) {
        const userPosts = objectToArray(userId, postState);
        const userTodos = objectToArray(userId, todoState);

        const postsArr = userPosts.map((p) => (
          <div
            className={classes.collapsible__content}
            key={`${p.id}_${uuidv4()}`}
          >
            <FaRegFileAlt />
            <p>{p.title}</p>
          </div>
        ));

        const todosArr = userTodos.map((p) => (
          <div
            className={classes.collapsible__content}
            key={`${p.id}_${uuidv4()}`}
          >
            <FaRegClipboard />
            <p>{p.title}</p>
          </div>
        ));

        const content = (
          <>
            <div className={classes.collapsible__link}>
              <Link to={`users/${userId}`}>
                Clik here to See more on the profile
              </Link>
            </div>
            {userPosts.length === 0 ? (
              <p>
                {userState.byId[userId].name} has not written any article yet
              </p>
            ) : (
              <>
                {postsArr}
                <br />
                {todosArr}
              </>
            )}
          </>
        );

        colls.push(
          <Collapsible
            key={`${userState.byId[userId].username}_${uuidv4()}`}
            name={userState.byId[userId].name}
            link={`users/${userId}`}
            post={userPosts.length}
            todo={userTodos.length}
            type="user"
            content={content}
            delete={() => onDeleteUser(userId)}
          />
        );
      }
    }

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
  user: state.user,
  post: state.post,
  todo: state.todo,
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
  user: PropTypes.object,
  post: PropTypes.object,
  todo: PropTypes.object,
  errors: PropTypes.object,
  onFetchUsers: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onFetchTodos: PropTypes.func,
  onFetchPosts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedHome);
