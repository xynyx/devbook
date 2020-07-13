import React, { Component } from "react";
import { connect } from "react-redux";
import profile from "../../reducers/profile";
import TextField from "../common/TextField";
import TextArea from "../common/TextArea";
import SelectList from "../common/SelectList";
import Input from "../common/Input";

interface CreateProfileState {
  handle: string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string;
  profile?: any;
  githubUsername: string;
  bio: string;
  twitter?: string;
  linkedIn?: string;
  instagram?: string;
  errors: any;
  displaySocialInputs: boolean;
}

interface CreateProfileProps {
  profile: any;
  errors: any;
}

class CreateProfile extends Component<CreateProfileProps, CreateProfileState> {
  constructor(props: CreateProfileProps) {
    super(props);
    this.state = {
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
      displaySocialInputs: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSocialNetworks = this.toggleSocialNetworks.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log("submit");
  }

  toggleSocialNetworks() {
    console.log("this.state :>> ", this.state);
    this.setState(prev => ({
      displaySocialInputs: !prev.displaySocialInputs,
    }));
  }

  onChange(e: any) {
    this.setState({ [e.target.name]: e.target.value } as any);
  }
  render() {
    const { errors } = this.state;

    const options = [
      {
        label: "* Select Professional Status",
      },
      {
        label: "Developer",
      },
      {
        label: "Junior Developer",
      },
      {
        label: "Senior Developer",
      },
      {
        label: "Manager",
      },
      {
        label: "Student",
      },
      {
        label: "Instructor / Teacher",
      },
      {
        label: "Intern",
      },
      {
        label: "Other",
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
                  <TextField
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="Current Company"
                  />
                  <TextField
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                    info="Portfolio Website"
                  />
                  <TextField
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="Location"
                  />
                  <TextField
                    placeholder="* Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={errors.skills}
                    info="Please use comma separated values - eg. 'JavaScript,Python,React'"
                  />
                  <TextField
                    placeholder="Github Username"
                    name="githubUsername"
                    value={this.state.githubUsername}
                    onChange={this.onChange}
                    error={errors.githubUsername}
                    info="Include your Github username if you want to display your repositories."
                  />
                  <TextArea
                    placeholder="Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="Tell the world about yourself!"
                  />
                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={this.toggleSocialNetworks}
                      className="btn btn-light"
                    >
                      Add Social Networks
                    </button>
                    <span className="text-muted">Optional</span>
                  </div>
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
