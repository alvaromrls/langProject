import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { get_groups } from "../util/api";

class SelectCategory extends React.Component {
  constructor(props) {
    super(props);
    // console.log(process.env);
    // console.log(process.env.MONGO_URL);
    // this.handleChange = this.handleChange.bind(this);
    // Set initial state (ONLY ALLOWED IN CONSTRUCTOR)
    this.state = {
      selection: "",
      grupo: [],
    };
  }
  componentDidMount() {
    get_groups().then((grupo) => {
      this.setState({ grupo });
    });
  }
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
              <MenuItem key={opcion} value={opcion}>
                {opcion}
              </MenuItem>
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
