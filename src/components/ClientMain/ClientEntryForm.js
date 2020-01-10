/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { determineCorrespondingCheckin, fetchData } from '../../Common';

import DailyInputsFields from './DailyInputsFields';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';

const exerciseInputData = require('./data/exercise-inputs.json');
const macrosInputData = require('./data/macros-inputs.json');
const weightInputData = require('./data/weight-inputs.json');

export default function ClientEntryForm({ client, date, type }) {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [needData, setNeedData] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorOnPage, setErrorOnPage] = useState(false);
  const [formData, setFormData] = useState({});

  const dataBasedOnType = new Map();
  dataBasedOnType.set('weight', {
    user: '',
    date: '',
    weight: 0,
    startofweek: ''
  });
  dataBasedOnType.set('macros', {
    user: '',
    date: '',
    startofweek: '',
    carbs: '',
    protein: '',
    fat: '',
    fiber: ''
  });
  dataBasedOnType.set('exercise', {
    user: '',
    date: '',
    startofweek: '',
    cardiotime: 0,
    cardiotype: '',
    addtltraining: '',
    notes: null
  });

  const inputDataType = new Map();
  inputDataType.set('weight', weightInputData);
  inputDataType.set('macros', macrosInputData);
  inputDataType.set('exercise', exerciseInputData);

  useEffect(() => {
    let source = axios.CancelToken.source();

    async function checkForFormEntry() {
      try {
        const entry = await fetchData(client, date, type, source);

        if (!isEmpty(entry)) {
          setNeedData(isEmpty(entry.data) ? true : false);

          let start = determineCorrespondingCheckin(client, date);

          let structure = dataBasedOnType.get(type);

          structure.user = client._id;
          structure.date = moment.utc(date.setHours(0, 0, 0, 0)).format();
          structure.startofweek = start;
          setFormData(structure);

          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkForFormEntry();

    return () => {
      source.cancel();
    };
  }, [client, date, type]);

  const submitForm = async e => {
    e.preventDefault();

    setLoading(true);

    console.log('Form data before post', formData);

    try {
      await axios.post(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/${type}/daily-log`,
        formData
      );
      setLoading(false);
      setNeedData(false);
      setErrorOnPage(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorOnPage(true);
      setSubmitDisabled(true);
    }
  };

  const updateEntry = e => {
    let update = formData;

    if (e.target.name === 'notes' && e.target.value === '') {
      update[e.target.name] = null;
    } else {
      update[e.target.name] =
        e.target.name === 'cardiotime'
          ? parseInt(e.target.value)
          : e.target.value;
    }

    setFormData(update);
    toggleSubmitButton(e);
  };

  const toggleSubmitButton = e => {
    console.log(formData);
    let disable =
      Object.values(formData).includes('') ||
      Object.values(formData).includes(NaN) ||
      (type === 'weight' && formData.weight.length < 3);
    setSubmitDisabled(disable);
  };

  const createInputList = () => {
    let inputData = inputDataType.get(type);

    return inputData.map((elem, index) => {
      return (
        <DailyInputsFields key={index} attributes={elem} change={updateEntry} />
      );
    });
  };

  const renderDate = date => {
    return new Date(date).setHours(0, 0, 0, 0) ===
      new Date().setHours(0, 0, 0, 0)
      ? 'today'
      : moment(date).format('dddd, MMMM Do, YYYY');
  };

  const entryFormRender = () => {
    if (needData) {
      return (
        <form noValidate className='client-landing-daily-inputs--exercise'>
          {createInputList()}
          <CardActions>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={submitDisabled}
              onClick={submitForm}
            >
              Submit
            </Button>
          </CardActions>
          {errorOnPage && (
            <p>There was an error with your submission. Please try again.</p>
          )}
        </form>
      );
    } else {
      return (
        <h4>{`Thank you for submitting your ${type} for ${renderDate(
          date
        )}!`}</h4>
      );
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        {loading ? <CircularProgress /> : entryFormRender()}
      </CardContent>
    </Card>
  );
}
