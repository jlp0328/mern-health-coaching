import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { orderBy, groupBy } from 'lodash';
import { createDisplayDate } from '../../Common';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';

import LogTable from '../LogPage/LogTable';

export default function WeightTablePage({ client, type }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let entries = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/${type}/${type}-log/${client._id}`
      );

      const orderedEntries = orderBy(entries.data, ['date'], ['desc']);
      orderedEntries.forEach(entry => {
        entry.displayDate = createDisplayDate(entry.date);
        entry.editable = false;
      });

      setRows(orderedEntries);
    }

    fetchData();
  }, [client, type]);

  // const calculateWeeklyWeightAvg = entries => {
  //   let weightOnly = [];
  //   entries.forEach(elem => {
  //     weightOnly.push(elem.weight);
  //   });

  //   return (weightOnly.reduce((a, b) => a + b) / entries.length).toFixed(2);
  // };

  const renderTables = () => {
    let groupedEntries = groupBy(rows, 'startofweek');

    return (
      <div className=''>
        {Object.entries(groupedEntries).map(([key, values]) => (
          <div key={key}>
            <div className='weight-log-page--week-and-avg'>
              <h2>{`Week of ${createDisplayDate(key, true)}`}</h2>
            </div>
            <Paper>
              <TableContainer>
                <LogTable rows={values} type={type} />
              </TableContainer>
            </Paper>
          </div>
        ))}
      </div>
    );
  };

  return renderTables();
}
