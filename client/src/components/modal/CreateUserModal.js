import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from '../../actions/userActions';
import classnames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreateUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      errors: {}
    }
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password
    }

    this.props.createUser(userData);
  }

  render() {
    const { errors } = this.props;
    return (
      <div>
        <button onClick={this.toggleModal} type="button"
          className="btn btn-success mb-4">New User</button>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggleModal}>Create new user</ModalHeader>
          <form onSubmit={this.onSubmit} noValidate>
            <ModalBody>
              <p><span className="modal-lable">Username : </span>
                <input type="text" name="username" value={this.state.username} onChange={this.onChange}
                  error={errors.username} className={classnames("form-control mt-2", {
                    'is-invalid': errors.username
                  })} />{errors.username && (<span className="invalid-feedback">{errors.username}</span>)}</p>
              <p><span className="modal-lable">First name : </span>
                <input type="text" name="firstName" value={this.state.firstName} onChange={this.onChange}
                  error={errors.firstName} className={classnames("form-control mt-2", {
                    'is-invalid': errors.firstName
                  })} />{errors.firstName && (<span className="invalid-feedback">{errors.firstName}</span>)}</p>
              <p><span className="modal-lable">Last name : </span>
                <input type="text" name="lastName" value={this.state.lastName} onChange={this.onChange}
                  error={errors.lastName} className={classnames("form-control mt-2", {
                    'is-invalid': errors.lastName
                  })} />{errors.lastName && (<span className="invalid-feedback">{errors.lastName}</span>)}</p>
              <p><span className="modal-lable">Password : </span>
                <input type="password" name="password" value={this.state.password} onChange={this.onChange}
                  error={errors.password} className={classnames("form-control mt-2", {
                    'is-invalid': errors.password
                  })} />{errors.password && (<span className="invalid-feedback">{errors.password}</span>)}</p>
              <p><span className="modal-lable">Email : </span>
                <input type="email" name="email" value={this.state.email} onChange={this.onChange}
                  error={errors.email} className={classnames("form-control mt-2", {
                    'is-invalid': errors.email
                  })} />{errors.email && (<span className="invalid-feedback">{errors.email}</span>)}</p>
              <p><span className="modal-lable">Phone : </span>
                <input type="tel" name="phone" value={this.state.phone} onChange={this.onChange}
                  error={errors.phone} className={classnames("form-control mt-2", {
                    'is-invalid': errors.phone
                  })} />{errors.phone && (<span className="invalid-feedback">{errors.phone}</span>)}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleModal}>Close</Button>
              <input type="submit" name="submit" value="Create New User" className="btn btn-primary" />
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

CreateUserModal.propTypes = {
  createUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
})

export default connect(mapStateToProps, {
  createUser
})(CreateUserModal);