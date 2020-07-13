import React, { Component } from "react";
import { connect } from "react-redux";
import profile from "../../reducers/profile";
import TextField from "../common/TextField";
import TextArea from "../common/TextArea";
import Input from "../common/Input";
import SelectList from "../common/SelectList";
import { createProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

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
  twitter: string;
  linkedIn: string;
  instagram: string;
  errors: any;
  displaySocialInputs: boolean;
}

interface CreateProfileProps {
  profile: any;
  errors: any;
  createProfile: any;
  history?: any;
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
    // const getKeyValue: any = <T extends object, U extends keyof T>(key: U) => (
    //   obj: T
    // ) => obj[key];

    console.log("this.state :>> ", this.state);
    const profileData: any = {} as CreateProfileState;
    const state: any = this.state;
    for (const input in state) {
      // console.log('getKeyValue(input)(this.state) :>> ', getKeyValue(input)(this.state));
      console.log("this.state[input] :>> ", state[input]);
      if (
        !state[input] ||
        input === "errors" ||
        input === "displaySocialInputs" ||
        input === "profile"
      ) {
        continue;
      } else {
        profileData[input] = state[input];
      }
    }

    console.log("profileData :>> ", profileData);

    this.props.createProfile(profileData, this.props.history);
  }

  toggleSocialNetworks() {
    this.setState(prev => ({
      displaySocialInputs: !prev.displaySocialInputs,
    }));
  }

  onChange(e: any) {
    this.setState({ [e.target.name]: e.target.value } as any);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    // const { errors } = this.props;

    const socialNetworks = (
      <div>
        <Input
          placeholder="Instagram URL"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram}
          onChange={this.onChange}
          error={errors.instagram}
        />
        <Input
          placeholder="LinkedIn URL"
          name="linkedIn"
          icon="fab fa-linkedin"
          value={this.state.linkedIn}
          onChange={this.onChange}
          error={errors.linkedIn}
        />
        <Input
          placeholder="Twitter URL"
          name="twitter"
          icon="fab fa-twitter"
          value={this.state.twitter}
          onChange={this.onChange}
          error={errors.twitter}
        />
      </div>
    );

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
        label: "Teacher",
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
                <form noValidate onSubmit={this.handleSubmit}>
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
                    info="Status"
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
                  {displaySocialInputs && socialNetworks}
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
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

// withRouter?
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
