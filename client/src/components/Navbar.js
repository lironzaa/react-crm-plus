import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

class Navbar extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4" >
        <div className="container">
          <Link className="navbar-brand text-primary" to="/"><i className="fab fa-react"></i> React Crm Plus</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/"><i className="fas fa-users"></i> Users Management
              </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/"><i className="fas fa-concierge-bell"></i> Service Call Management</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-primary" onClick={this.onLogoutClick} href="/login"><i className="fas fa-sign-out-alt"></i> Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));