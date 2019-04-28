import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editUser } from '../../actions/userActions';
import classnames from 'classnames';

class EditUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id,
      username: nextProps.username,
      firstName: nextProps.firstName,
      lastName: nextProps.lastName,
      email: nextProps.email,
      phone: nextProps.phone
    });
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
      phone: this.state.phone
    }
    this.props.editUser(this.state.id, userData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="modal fade" id="editUserModal" tabIndex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">Edit User</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit} noValidate>
              <div className="modal-body">
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
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                <input type="submit" name="submit" value="Save Changes" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditUserModal.propTypes = {
  editUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
})

export default connect(mapStateToProps, {
  editUser
})(EditUserModal);