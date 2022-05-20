import React from "react";
import VocabularyTable from "./VocabularyTable";
import SelectCategory from "./SelectCategory";
import Profile from "../auth/Profile";

class ShowVocabulary extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    // Set initial state (ONLY ALLOWED IN CONSTRUCTOR)
    this.state = {
      selection: "",
      userInfo: {},
      token: "",
    };
  }
  handleChange = (event) => {
    this.setState({
      selection: event.target.value,
    });
  };
  handleLogin = (userInfo, token) => {
    this.setState({ userInfo, token });
  };
  render() {
    return (
      <div style={{ paddingTop: 50 }}>
        <Profile handleLogin={this.handleLogin} />
        {/* <h2> Wellcome! </h2> */}
        {this.state.token && (
          <>
            {" "}
            <SelectCategory
              handleChange={this.handleChange}
              selection={this.state.selection}
              token={this.state.token}
            />
            <VocabularyTable
              group={this.state.selection}
              token={this.state.token}
            />
          </>
        )}
      </div>
    );
  }
}
export default ShowVocabulary;
