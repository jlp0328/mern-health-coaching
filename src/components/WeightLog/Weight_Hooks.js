import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

import axios from "axios";
import moment from "moment";
import { orderBy, isEmpty } from "lodash";

import Datepicker from "../Datepicker/Datepicker";
import WeightLogTable from "./WeightLogTable";

export default function Weight(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [rows, setRows] = useState([]);
  const [client, setClient] = useState({});

  useEffect(() => {
    async function fetchData() {
      setClient(props.client);
      let weightEntries = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/weight-log/${props.client._id}`
      );

      const orderedEntries = orderBy(weightEntries.data, ["date"], ["desc"]);
      orderedEntries.forEach(entry => {
        entry.displayDate = moment(entry.date).format("dddd, MMMM Do, YYYY");
        entry.editable = false;
      });

      setRows(orderedEntries);
    }

    fetchData();
  }, [props.client]);

  function handleChangeRowsPerPage(e) {
    setRowsPerPage(e.target.value);
    setPage(0);
  }

  function handleChangePage(e, newPage) {
    setPage(newPage);
  }

  return (
    <div>
      {/* <Datepicker /> */}
      <Paper>
        <TableContainer>
          <WeightLogTable rows={rows} rowsPerPage={rowsPerPage} page={page} />
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[
            7,
            14,
            25,
            50,
            100,
            { value: rows.length, label: "All" }
          ]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  );
}
