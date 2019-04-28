import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './common/Spinner';
import { getUsers } from '../actions/userActions';
import EditUserModal from './modal/EditUserModal';
import CreateUserModal from './modal/CreateUserModal';
import DeleteUserModal from './modal/DeleteUserModal';

class UsersManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredItem: 1
    }
  }

  replaceModalItem = index => {
    this.setState({
      requiredItem: index
    });
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    this.props.getUsers();
  }

  render() {
    const { users, loading } = this.props.user;
    let usersList;
    let editUserModal;
    if (users === null || loading) {
      usersList = <tr><td colSpan="4"><Spinner /></td></tr>
    } else {
      if (users.length > 0) {
        const requiredItem = this.state.requiredItem;
        let modalData = users[requiredItem];
        editUserModal = <EditUserModal
          username={modalData.username}
          firstName={modalData.firstName}
          lastName={modalData.lastName}
          email={modalData.email}
          phone={modalData.phone}
          id={modalData._id}
        />
        usersList = users.map((user, index) => (
          <tr key={index}>
            <th scope="row">
              <button data-toggle="modal" data-target="#editUserModal"
                onClick={() => this.replaceModalItem(index)} type="button"
                className="btn btn-primary fa-xs mr-1"><i className="fas fa-pencil-alt"></i></button>
              <DeleteUserModal id={user._id} />
            </th>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        ))
      } else {
        usersList = <h2>No users</h2>
      }
    }

    return (
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-2">Users Management</h1>
          <CreateUserModal ></CreateUserModal>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Options</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {(usersList)}
            </tbody>
          </table>
          {(editUserModal)}
        </div>
      </div>
    )
  }
}

UsersManagement.propTypes = {
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, {
  getUsers
})(UsersManagement);