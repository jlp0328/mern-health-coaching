import React, { useState, useEffect } from "react";
import "./WeightLog.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

import { orderBy } from "lodash";

// import UpdateWeightModal from "../Modal/UpdateWeightModal";

const columns = [
  { id: "weight-log-date", label: "Date", minWidth: 170, sort: true },
  { id: "weight-log-weight", label: "Weight", minWidth: 100, sort: false }
];

export default function WeightLogTable(props) {
  let { page, rowsPerPage, rows } = props;

  const [weightSort, setWeightSort] = useState("desc");
  const [data, setData] = useState(rows);
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  const sortByDate = () => {
    let sortOrder = weightSort === "desc" ? "asc" : "desc";
    let newOrder = orderBy(data, ["date"], [sortOrder]);
    setWeightSort(sortOrder);
    setData(newOrder);
  };

  const editWeight = data => {
    console.log("EDIT", data);
    data.editable = true;
  };

  return (
    <div>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{
                  minWidth: column.minWidth
                }}
              >
                <TableSortLabel
                  direction={weightSort}
                  active={column.sort}
                  onClick={sortByDate}
                ></TableSortLabel>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => {
              return (
                <TableRow hover tabIndex={-1} key={row._id}>
                  <TableCell align="left">{row.displayDate}</TableCell>
                  <TableCell className="weight-log-edit-weight" align="center">
                    {row.weight}
                    {row.editable ? (
                      <Button variant="contained" size="small" color="primary">
                        Save
                      </Button>
                    ) : (
                      <Fab aria-label="edit" size="small" color="secondary">
                        <EditIcon
                          onClick={() => {
                            editWeight(row);
                          }}
                        />
                      </Fab>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
