import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
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
      name: this.state.name,
      password: this.state.password
    }

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to <i className="fab fa-react text-primary"></i> React Crm Plus</p>
              <form onSubmit={this.onSubmit} noValidate>
                <div className="form-group">
                  <input type="text" value={this.state.name}
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.name
                    })} onChange={this.onChange} placeholder="Name" name="name" />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" value={this.state.password}
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.password
                    })} onChange={this.onChange} placeholder="Password" name="password" />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <input type="submit" value="Login" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);