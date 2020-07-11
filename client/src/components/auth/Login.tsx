import React, { Component } from "react";
import { loginUser } from "../../actions/authActions";
import { LoginInfo, AuthInterface } from "../../types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

interface LoginProps {
  // registerUser(user: UserRegisterInfo, history: any): any;
  loginUser(user: LoginInfo): any;
  auth: {
    user: LoginInfo;
  };
  errors?: any;
  history?: any;
}

const mapStateToProps = (state: AuthInterface) => ({
  auth: state.auth,
  errors: state.errors,
});

// Component<Props, State>
class Login extends Component<LoginProps, LoginInfo> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      // password2: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };

  handleSubmit = (e: any) => {
    //password2
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };

    this.props.loginUser(user);

    // console.log(user);
  };

  componentWillReceiveProps(nextProps: any) {
    console.log("nextProps :>> ", nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { errors } = this.state;

    const baseClasses = "form-control form-control-lg";
    const invalidEmail = classnames(baseClasses, {
      "is-invalid": errors.email,
    });
    const invalidPassword = classnames(baseClasses, {
      "is-invalid": errors.password,
    });

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevBook account
              </p>
              <form noValidate onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={invalidEmail}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
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
                  />{" "}
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
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

// Remember -> connect allows this component to have access to the store/state!
// mapStateToProps converts the state to props that are then passed down
export default connect(mapStateToProps, { loginUser })(Login);
