import React, { useState, useEffect } from "react";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

export default function MacrosTableBody({ rows, page, rowsPerPage }) {
  //Might need to add useEffect to track prop changes

  const editMacros = rows => {
    console.log("EDIT", rows);
    rows.editable = true;
  };

  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(row => {
          return (
            <TableRow hover tabIndex={-1} key={row._id}>
              <TableCell align="left">{row.displayDate}</TableCell>
              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell className="" align="left">
                {row.fiber}
                {row.editable ? (
                  <Button variant="contained" size="small" color="primary">
                    Save
                  </Button>
                ) : (
                  <Fab aria-label="edit" size="small" color="secondary">
                    <EditIcon
                      onClick={() => {
                        editMacros(row);
                      }}
                    />
                  </Fab>
                )}
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
}