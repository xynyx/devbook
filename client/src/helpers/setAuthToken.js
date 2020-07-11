import axios from "axios";

export default function setAuthToken(token) {
  if (token) {
    // Apply the token to the Authorization header as the default request after user successfully logs in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
