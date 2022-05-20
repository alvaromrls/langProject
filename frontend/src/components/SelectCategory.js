import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { get_groups } from "../util/api";

class SelectCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "",
      grupo: [],
    };
  }
  componentDidMount() {
    // console.log(this.props);
    get_groups(this.props.token).then((grupo) => {
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
              <MenuItem key={opcion.id} value={opcion.id}>
                {opcion.name}
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
