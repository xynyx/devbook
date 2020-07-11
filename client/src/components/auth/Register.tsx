import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

interface UserRegisterInfo {
  name: string;
  email: string;
  password: string;
  errors?: any;
}

interface RegisterProps {
  registerUser(user: UserRegisterInfo): any;
  auth: {
    user: UserRegisterInfo;
  };
}

// Component<Props, State>
class Register extends Component<RegisterProps, UserRegisterInfo> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {},
      // password2: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value } as UserRegisterInfo);
  };

  handleSubmit = (e: any) => {
    console.log("e", e);
    //password2
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = { name, email, password };

    this.props.registerUser(newUser);
  
  };

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    const baseClasses = "form-control form-control-lg";
    const invalidName = classnames(baseClasses, {
      "is-invalid": errors.name,
    });
    const invalidEmail = classnames(baseClasses, {
      "is-invalid": errors.email,
    });
    const invalidPassword = classnames(baseClasses, {
      "is-invalid": errors.password,
    });

    return (
      <div className="register">
        {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevBook account</p>
              <form noValidate onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    // className="form-control form-control-lg"
                    className={invalidName}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={invalidEmail}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />

                  {/* <small className="form-text text-muted">?</small> */}
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={invalidPassword}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    // className={invalidName}
                    placeholder="Confirm Password"
                    name="password2"
                    // value={this.state.password2}
                    // onChange={this.handleInputChange}
                  />
                  {/* {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )} */}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Takes in state
const mapStateToProps = (state: { auth: any }) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(Register);
