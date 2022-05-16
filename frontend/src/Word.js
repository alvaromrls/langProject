import React from "react";

class Word extends React.Component {
  render() {
    const { to_learn, translation, isLoading } = this.props;

    return (
      <div>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <h3>English {to_learn}</h3>
            <h3>Spanish {translation}</h3>
          </>
        )}
      </div>
    );
  }
}
export default Word;
