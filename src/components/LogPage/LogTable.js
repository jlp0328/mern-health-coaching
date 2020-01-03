import React, { useState, useEffect } from "react";
import "./LogPageTable.css";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import MacrosTableBody from "../MacrosLog/MacrosTableBody";
import WeightTableBody from "../WeightLog/WeightTableBody";
import ExerciseTableBody from "../ExerciseLog/ExerciseTableBody";

import { orderBy } from "lodash";

const weightColumns = [
  { id: "weight-log-date", label: "Date", minWidth: 170, sort: true },
  { id: "weight-log-weight", label: "Weight", minWidth: 100, sort: false }
];

const exerciseColumns = [
  { id: "exercise-log-date", label: "Date", minWidth: 170, sort: true },
  { id: "exercise-log-time", label: "Time", minWidth: 100, sort: false },
  { id: "exercise-log-type", label: "Type", minWidth: 100, sort: false },
  { id: "exercise-log-notes", label: "Notes", minWidth: 100, sort: false }
];

const macrosColumns = [
  { id: "macros-log-date", label: "Date", minWidth: 170, sort: true },
  { id: "macros-log-carbs", label: "Carbs", minWidth: 100, sort: false },
  { id: "macros-log-protein", label: "Protein", minWidth: 100, sort: false },
  { id: "macros-log-fat", label: "Fat", minWidth: 100, sort: false },
  { id: "macros-log-fiber", label: "Fiber", minWidth: 100, sort: false }
];

export default function LogTable({ page, rowsPerPage, rows, type }) {
  const [sort, setSort] = useState("desc");
  const [data, setData] = useState(rows);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  useEffect(() => {
    if (type === "macros") {
      setColumns(macrosColumns);
    } else if (type === "weight") {
      setColumns(weightColumns);
    } else if (type === "exercise") {
      setColumns(exerciseColumns);
    }
  }, [type]);

  const sortByDate = () => {
    let sortOrder = sort === "desc" ? "asc" : "desc";
    let newOrder = orderBy(data, ["date"], [sortOrder]);
    setSort(sortOrder);
    setData(newOrder);
  };

  const determineTableType = () => {
    if (type === "macros") {
      console.log(rows);
      return (
        <MacrosTableBody rows={data} rowsPerPage={rowsPerPage} page={page} />
      );
    } else if (type === "weight") {
      return (
        <WeightTableBody rows={data} rowsPerPage={rowsPerPage} page={page} />
      );
    } else {
      return (
        <ExerciseTableBody rows={data} rowsPerPage={rowsPerPage} page={page} />
      );
    }
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
                {column.label === "Date" && (
                  <TableSortLabel
                    direction={sort}
                    active={column.sort}
                    onClick={sortByDate}
                  ></TableSortLabel>
                )}
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {determineTableType()}
      </Table>
    </div>
  );
}
