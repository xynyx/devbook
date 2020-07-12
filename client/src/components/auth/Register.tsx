import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { UserRegisterInfo, AuthInterface, Auth } from "../../types";
import TextField from "../common/TextField";

interface RegisterProps {
  registerUser(user: UserRegisterInfo, history: any): any;
  auth: Auth;
  errors?: any;
  history?: any;
}

// Takes in states -> convert to props to pass to the component / Redux
const mapStateToProps = (state: AuthInterface) => ({
  auth: state.auth,
  errors: state.errors,
});

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
    } as UserRegisterInfo;

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

    // The action (registerUser) cannot use history like a component can
    // However you can pass an action the history to be able to redirect within the action itself
    this.props.registerUser(newUser, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.props;
    const { user } = this.props.auth;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevBook account</p>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  error={errors.name}
                />
                <TextField
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  error={errors.email}
                />
                <TextField
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  error={errors.password}
                />
                {/* <TextField
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.handleInputChange}
                  error={errors.password2}
                /> */}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// withRouter, which is a HOC, gives you access to the history object and the closest <Route> match
// Passes 'match, location, history' props to the wrapped component whenever it renders
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
