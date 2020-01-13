import React, { useState, useEffect } from 'react';
import { findIndex, isEmpty } from 'lodash';
import { isNumberKey, updateLogData } from '../../Common';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

export default function WeightTableBodyAvg({ rows, average }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(rows);
  }, [rows]);

  const editWeightToggle = row => {
    let update = [...entries];
    let index = findIndex(update, row);
    update[index].editable = true;
    setEntries(update);
  };

  const saveUpdatedWeight = row => {
    let updatedWeight = parseInt(document.getElementById(row._id).value);
    let update = [...entries];
    let index = findIndex(update, row);
    update[index].editable = false;

    if (!isEmpty(updatedWeight)) {
      update[index].weight = row.weight = updatedWeight;
      updateLogData(row, 'weight');
    }
    setEntries(update);
    updateWeightAvg();
  };

  const updateWeightAvg = () => {
    average();
  };

  return (
    <TableBody>
      {entries.map(row => {
        return (
          <TableRow hover tabIndex={-1} key={row._id}>
            <TableCell align='left'>{row.displayDate}</TableCell>
            <TableCell align='center'>
              {row.editable ? (
                <TextField
                  id={row._id}
                  onKeyPress={isNumberKey}
                  defaultValue={row.weight}
                />
              ) : (
                row.weight
              )}
            </TableCell>
            <TableCell>
              {row.editable ? (
                <Button
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={() => {
                    saveUpdatedWeight(row);
                  }}
                >
                  Save
                </Button>
              ) : (
                <Fab aria-label='edit' size='small' color='secondary'>
                  <EditIcon
                    onClick={() => {
                      editWeightToggle(row);
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
