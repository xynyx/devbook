import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

interface DashboardInterface {
  getCurrentProfile(): any;
}

class Dashboard extends Component<DashboardInterface> {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return <div></div>;
  }
}

export default connect(null, { getCurrentProfile })(Dashboard);
