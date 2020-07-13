import React, { Component } from "react";
import { connect } from "react-redux";
import profile from "../../reducers/profile";

interface CreateProfileInterface {
  socialNetworks: boolean;
  handle: string;
  company?: string;
  website?: string;
  location?: string;
  status?: string;
  skills?: string;
  profile: any;
  githubUsername?: string;
  bio?: string;
  twitter?: string;
  linkedIn?: string;
  instagram?: string;
  errors: any;
}

class CreateProfile extends Component<CreateProfileInterface> {
  constructor(props: CreateProfileInterface) {
    super(props);
    this.state = {
      socialNetworks: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubUsername: "",
      bio: "",
      twitter: "",
      linkedIn: "",
      instagram: "",
      errors: {},
    };
  }
  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create Your Profile{" "}
                <p className="lead text-center">Add stuff</p>
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps)(CreateProfile);
