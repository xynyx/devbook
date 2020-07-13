import React, { Component } from "react";
import { connect } from "react-redux";
import profile from "../../reducers/profile";
import TextField from "../common/TextField";
import TextArea from "../common/TextArea";
import SelectList from "../common/SelectList";
import Input from "../common/Input";

interface CreateProfileState {
  socialNetworks: boolean;
  handle: string;
  company?: string;
  website?: string;
  location?: string;
  status: string;
  skills?: string;
  profile?: any;
  githubUsername?: string;
  bio?: string;
  twitter?: string;
  linkedIn?: string;
  instagram?: string;
  errors: any;
}

interface CreateProfileProps {
  profile: any;
  errors: any;
}

class CreateProfile extends Component<CreateProfileProps, CreateProfileState> {
  constructor(props: CreateProfileProps) {
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

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log("submit");
  }

  onChange(e: any) {
    this.setState({ [e.target.name]: e.target.value } as any);
  }
  render() {
    const { errors } = this.state;

    const options = [
      {
        label: "* Select Professional Status",
        value: 0,
      },
      {
        label: "Developer",
        value: "Developer",
      },
      {
        label: "Junior Developer",
        value: "Junior Developer",
      },
      {
        label: "Senior Developer",
        value: "Senior Developer",
      },
      {
        label: "Manager",
        value: "Manager",
      },
      {
        label: "Student",
        value: "Student",
      },
      {
        label: "Instructor / Teacher",
        value: "Instructor / Teacher",
      },
      {
        label: "Intern",
        value: "Intern",
      },
      {
        label: "Other",
        value: "Other",
      },
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create Your Profile
                <p className="lead text-center">Add stuff</p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.handleSubmit}>
                <TextField
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. These fields CANNOT be changed later."
                />
                <SelectList
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Job Title"
                />
                </form>
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: CreateProfileState) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps)(CreateProfile);
