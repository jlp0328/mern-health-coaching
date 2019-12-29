import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import axios from "axios";
import moment from "moment";
import { orderBy, sortBy } from "lodash";

import Datepicker from "../Datepicker/Datepicker";

const columns = [
  { id: "weight-log-date", label: "Date", minWidth: 170, sort: true },
  { id: "weight-log-weight", label: "Weight", minWidth: 100, sort: false }
];

export default class Weight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 7,
      rows: [],
      client: {},
      weightSort: "asc"
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      let weightEntries = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/${this.props.client._id}`
      );

      weightEntries.data.forEach(entry => {
        entry.date = moment(entry.date).format("dddd, MMMM Do YYYY");
      });

      const orderedEntries = orderBy(weightEntries.data, ["date"], ["asc"]);

      this.setState({
        client: this.props.client,
        rows: orderedEntries
      });
    }
  }

  sortByDate = () => {
    this.setState(prevState => ({
      weightSort: prevState.weightSort === "asc" ? "desc" : "asc",
      rows: orderBy(
        prevState.rows,
        ["date"],
        [prevState.weightSort === "asc" ? "desc" : "asc"]
      )
    }));
  };

  render() {
    const { page, rowsPerPage, rows, client, weightSort } = this.state;

    return (
      <div>
        {/* <Datepicker /> */}
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <TableSortLabel
                        direction={weightSort}
                        active={column.sort}
                        onClick={this.sortByDate}
                      ></TableSortLabel>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    return (
                      <TableRow hover tabIndex={-1} key={row._id}>
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="left">{row.weight}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[
              7,
              14,
              25,
              50,
              100,
              { value: -1, label: "All" }
            ]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
          />
        </Paper>
      </div>
    );
  }
}
