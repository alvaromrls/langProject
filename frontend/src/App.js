// src/App.js
import Word from "./Word";
import React from "react";
import axios from "axios";

class App extends React.Component {
  render() {
    return <Word to_learn="Eating" translation="Comiendo" />;
  }
  componentDidMount() {
    axios.get("http://127.0.0.1:30000/api/vocabulary/word").then((res) => {
      console.log(res);
    });
  }
}

export default App;
