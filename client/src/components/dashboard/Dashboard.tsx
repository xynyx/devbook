import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";
import { Auth } from "../../types";
import Spinner from "../common/Spinner";

interface DashboardInterface {
  getCurrentProfile(): any;
  auth: Auth;
  //TODO Update later
  profile: any;
}

// interface ProfileInterface {

// }

class Dashboard extends Component<DashboardInterface> {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (!profile || loading) {
      dashboardContent = <Spinner />;
      // If profile 'exists' but has no keys
    } else if (Object.keys(profile).length > 0) {
      dashboardContent = <h4>TODO: show profile</h4>;
    } else {
      // User has no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name} </p>
          <p>Please set up a profile</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
