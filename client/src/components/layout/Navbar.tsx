import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Auth, AuthInterface } from "../../types";
interface NavbarPropInterface {
  logoutUser(): any;
  auth: Auth;
}



class Navbar extends Component<any> {
  handleLogout(e: any) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    console.log('this.props :>> ', this.props);
    const { isAuthenticated, user } = this.props.auth;

    const authorizedLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            // href="#"
            onClick={this.handleLogout.bind(this)}
            className="nav-link"
          >
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
            />
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              DevBook
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    Developers
                  </Link>
                </li>
              </ul>
              {isAuthenticated ? authorizedLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state: AuthInterface) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
