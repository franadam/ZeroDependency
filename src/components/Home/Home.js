import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  FaCalendarAlt,
  FaLink,
  FaMapMarkerAlt,
  FaImage,
  FaPen,
} from 'react-icons/all';

import classes from './Home.module.css';

import { fetchUsers, deleteUserInfo, fetchPosts } from '../../store/actions';
import Collapsible from '../Collapsible/Collapsible';

export class UnconnectedHome extends Component {
  componentDidMount() {
    this.props.onFetchUsers();
    this.props.onFetchPosts();
  }

  count(posts, user) {
    posts.filter((p) => (p.userId = user.id)).length;
  }

  render() {
    const { users, posts, errors, onDeleteUser } = this.props;

    const colls = users
      ? users.map((user) => {
          const userPostCount = posts.filter((p) => p.userId === user.id)
            .length;

          return (
            <Collapsible
              key={user.username}
              name={user.name}
              post={userPostCount}
              album={3}
              type="user"
              content={user.company.name}
              delete={() => onDeleteUser(user.id)}
            />
          );
        })
      : [];

    return (
      <div data-test="component-home" className={classes.main}>
        <div className={classes.wrapper}>
          <h1>Users</h1>
          {colls}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  posts: state.post.posts,
  errors: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchUsers: () => dispatch(fetchUsers()),
  onDeleteUser: (userID) => dispatch(deleteUserInfo(userID)),
  onFetchPosts: () => dispatch(fetchPosts()),
});

UnconnectedHome.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  posts: PropTypes.arrayOf(PropTypes.object),
  errors: PropTypes.object,
  onFetchUsers: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onFetchPosts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedHome);
