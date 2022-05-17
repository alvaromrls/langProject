import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

class SelectCategory extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // Set initial state (ONLY ALLOWED IN CONSTRUCTOR)
    this.state = {
      selection: "",
      grupo: [],
    };
  }
  componentDidMount() {
    axios.get("http://127.0.0.1:30000/api/vocabulary/group").then((res) => {
      const grupo = res.data.map((dato) => dato.name);
      this.setState({ grupo });
    });
  }
  //   handleChange = (event) => {
  //     this.setState({
  //       selection: event.target.value,
  //     });
  //   };
  render() {
    return (
      <Box
        maxWidth="md"
        sx={{ minWidth: 120, marginLeft: "auto", marginRight: "auto" }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Grupo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.props.selection}
            label="Grupo"
            onChange={this.props.handleChange}
          >
            {this.state.grupo.map((opcion) => (
              <MenuItem value={opcion}>{opcion}</MenuItem>
            ))}
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
    );
  }
}
export default SelectCategory;
