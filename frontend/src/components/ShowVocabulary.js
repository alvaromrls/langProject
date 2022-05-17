import React from "react";
import VocabularyTable from "./VocabularyTable";
import SelectCategory from "./SelectCategory";

class ShowVocabulary extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // Set initial state (ONLY ALLOWED IN CONSTRUCTOR)
    this.state = {
      selection: "",
    };
  }
  handleChange = (event) => {
    this.setState({
      selection: event.target.value,
    });
  };
  render() {
    return (
      <div style={{ paddingTop: 50 }}>
        {/* <h2> Wellcome! </h2> */}
        <SelectCategory
          handleChange={this.handleChange}
          selection={this.state.selection}
        />
        <VocabularyTable group={this.state.selection} />
      </div>
    );
  }
}
export default ShowVocabulary;
