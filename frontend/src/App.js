// src/App.js
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ShowVocabulary from "./components/ShowVocabulary";

class App extends React.Component {
  render() {
    return (
      <Container maxWidth="false" sx={{ bgcolor: "#cfe8fc", margin: "0" }}>
        <Box
          maxWidth="lg"
          sx={{ bgcolor: "#ffffff", height: "100vh", maring: "auto" }}
        >
          <ShowVocabulary />
        </Box>
      </Container>
    );
  }
}

export default App;
