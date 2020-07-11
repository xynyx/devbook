import React, { Component } from "react";
import { loginUser } from "../../actions/authActions";
import { LoginInfo, AuthInterface } from "../../types";
import { connect } from "react-redux";

interface LoginProps {
  // registerUser(user: UserRegisterInfo, history: any): any;
  loginUser(user: LoginInfo, history: any): any;
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

    loginUser(user, null);

    // console.log(user);
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevBook account
              </p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
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

export default connect(null, { loginUser })(Login);
