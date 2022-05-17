import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import { get_words } from "../util/api";

class VocabularyTable extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    // Set initial state (ONLY ALLOWED IN CONSTRUCTOR)
    this.state = {
      vocabulario: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.group !== prevProps.group) {
      this.setState({ vocabulario: [] });
      get_words(this.props.group).then((vocabulario) => {
        this.setState({ vocabulario });
      });
    }
  }
  render() {
    return (
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "70%", margin: "auto", marginTop: 5 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">English</TableCell>
              <TableCell align="center">Spanish</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.vocabulario.map((row) => (
              <Zoom in={true} style={{ transitionDelay: "10ms" }} key={row.id}>
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.to_learn}</TableCell>
                  <TableCell align="center">{row.translation}</TableCell>
                </TableRow>
              </Zoom>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default VocabularyTable;
