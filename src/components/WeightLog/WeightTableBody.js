import React, { useState, useEffect } from 'react';
import { findIndex } from 'lodash';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

export default function WeightTableBodyAvg({ rows }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(rows);
  }, [rows]);

  const editWeight = row => {
    console.log(entries);
    let update = [...entries];
    let index = findIndex(update, row);
    update[index].editable = true;
    setEntries(update);
  };

  return (
    <TableBody>
      {entries.map(row => {
        return (
          <TableRow hover tabIndex={-1} key={row._id}>
            <TableCell align='left'>{row.displayDate}</TableCell>
            <TableCell align='center'>
              {row.editable ? (
                <TextField defaultValue={row.weight} />
              ) : (
                row.weight
              )}
            </TableCell>
            <TableCell>
              {row.editable ? (
                <Button variant='contained' size='small' color='primary'>
                  Save
                </Button>
              ) : (
                <Fab aria-label='edit' size='small' color='secondary'>
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
  );
}
