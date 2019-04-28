import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUser } from '../../actions/userActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      errors: {}
    }
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  deleteUser = id => {
    this.props.deleteUser(id);
  }

  render() {
    const { id } = this.props;
    return (
      <React.Fragment>
        <button type="button" className="btn btn-danger fa-xs" onClick={this.toggleModal}>
          <i className="far fa-trash-alt"></i></button>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggleModal}>Delete user</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this user?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>Close</Button>
            <Button color="primary" name="submit" onClick={() => this.deleteUser(id)}>Delete User</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

DeleteUserModal.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
})

export default connect(mapStateToProps, {
  deleteUser
})(DeleteUserModal);