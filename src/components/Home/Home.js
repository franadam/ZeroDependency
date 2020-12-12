import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './Home.module.css';

import { fetchUsers, deleteUserProfile } from '../../store/actions';

export class UnconnectedHome extends Component {
  componentDidMount() {
    this.props.onFetchUsers();
  }

  render() {
    const { users, errors } = this.props;

    const usersArray = users
      ? users.map((e) => (
          <li
            key={e.username}
            onClick={() => this.props.onDeleteUserProfile(e.id)}
          >
            {e.name}
          </li>
        ))
      : [];

    return (
      <div data-test="component-home" className={classes.main}>
        Home
        {usersArray.length ? <ul>{usersArray}</ul> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  errors: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchUsers: () => dispatch(fetchUsers()),
  onDeleteUserProfile: (userID) => dispatch(deleteUserProfile(userID)),
});

UnconnectedHome.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  errors: PropTypes.object,
  onFetchUsers: PropTypes.func,
  onDeleteUserProfile: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedHome);
