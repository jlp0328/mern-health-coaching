import React, { useState, useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import { orderBy } from "lodash";

const columns = [
  { id: "weight-log-date", label: "Date", minWidth: 170, sort: true },
  { id: "weight-log-weight", label: "Weight", minWidth: 100, sort: false }
];

export default function TableRowHead(props) {
  let { page, rowsPerPage, rows } = props;

  const [weightSort, setWeightSort] = useState("desc");
  const [data, setData] = useState(rows);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  function sortByDate() {
    let sortOrder = weightSort === "desc" ? "asc" : "desc";
    let newOrder = orderBy(data, ["date"], [sortOrder]);
    console.log(newOrder);
    setWeightSort(sortOrder);
    setData(newOrder);
  }

  return (
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
                <TableCell align="left">{row.weight}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
