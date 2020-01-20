import React, { useState, useEffect } from 'react';
import { findIndex, isNaN } from 'lodash';
import { isNumberKey, updateLogData } from '../../Common';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const macroFields = ['protein', 'carbs', 'fat', 'fiber'];

export default function MacrosTableBody({ rows }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(rows);
  }, [rows]);

  const editMacros = row => {
    let update = [...entries];
    let index = findIndex(update, row);
    update[index].editable = true;
    setEntries(update);
  };

  const parseValue = (id, current) => {
    let valueUpdate = parseFloat(document.getElementById(id).value);
    return isNaN(valueUpdate) ? current : valueUpdate;
  };

  const saveUpdatedMacros = row => {
    let updatedMacros = row;
    let update = [...entries];
    let index = findIndex(update, row);

    macroFields.forEach(elem => {
      update[index].elem = updatedMacros[elem] = parseValue(
        `${row._id}-${elem}`,
        row[elem]
      );
    });

    update[index].editable = false;

    updateLogData(updatedMacros, 'macros');
    setEntries(update);
  };

  const calculateDifference = (goal, current) => {
    let diff = goal - current;
    diff = isNaN(diff) ? '--' : diff;
    return diff;
  };

  return (
    <TableBody className='macros-log--table-body'>
      {entries.map(row => {
        return (
          <TableRow hover tabIndex={-1} key={row.unique}>
            <TableCell align='center'>{row.displayDate}</TableCell>
            <TableCell align='center'>{row.caloriesgoal}</TableCell>
            <TableCell align='center'>{row.proteingoal}</TableCell>
            <TableCell align='center'>{row.carbsgoal}</TableCell>
            <TableCell className='macros-log--divider' align='center'>
              {row.fatgoal}
            </TableCell>
            <TableCell align='center'>
              {row.editable ? (
                <TextField
                  id={`${row._id}-protein`}
                  onKeyPress={isNumberKey}
                  defaultValue={row.protein}
                />
              ) : (
                row.protein
              )}
            </TableCell>
            <TableCell align='center'>
              {row.editable ? (
                <TextField
                  id={`${row._id}-carbs`}
                  onKeyPress={isNumberKey}
                  defaultValue={row.carbs}
                />
              ) : (
                row.carbs
              )}
            </TableCell>
            <TableCell align='center'>
              {row.editable ? (
                <TextField
                  id={`${row._id}-fat`}
                  onKeyPress={isNumberKey}
                  defaultValue={row.fat}
                />
              ) : (
                row.fat
              )}
            </TableCell>
            <TableCell className='macros-log--divider' align='center'>
              {row.editable ? (
                <TextField
                  id={`${row._id}-fiber`}
                  onKeyPress={isNumberKey}
                  defaultValue={row.fiber}
                />
              ) : (
                row.fiber
              )}
            </TableCell>
            <TableCell align='center'>
              {calculateDifference(row.proteingoal, row.protein)}
            </TableCell>
            <TableCell align='center'>
              {calculateDifference(row.carbsgoal, row.carbs)}
            </TableCell>
            <TableCell align='center'>
              {calculateDifference(row.fatgoal, row.fat)}
            </TableCell>
            <TableCell className='' align='center'>
              {row.editable ? (
                <Button
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={() => {
                    saveUpdatedMacros(row);
                  }}
                >
                  Save
                </Button>
              ) : (
                <Fab aria-label='edit' size='small' color='secondary'>
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
