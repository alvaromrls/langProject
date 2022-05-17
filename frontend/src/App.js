// src/App.js
import Word from "./Word";
import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ShowVocabulary from "./components/ShowVocabulary";

class App extends React.Component {
  render() {
    return (
      <Container maxWidth="false" sx={{ bgcolor: "#cfe8fc", marginTop: "0" }}>
        <Box
          maxWidth="lg"
          sx={{ bgcolor: "white", height: "100vh", maring: "auto" }}
        >
          <ShowVocabulary />
        </Box>
      </Container>
    );
  }
  // componentDidMount() {
  //   axios.get("http://127.0.0.1:30000/api/vocabulary/word").then((res) => {
  //     console.log(res);
  //   });
  // }
}

export default App;
