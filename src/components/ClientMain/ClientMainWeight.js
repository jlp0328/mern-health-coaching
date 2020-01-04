import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { isEmpty } from "lodash";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

import { isNumberKey } from "../../Common";

export default function ClientMainWeight({ client }) {
  const [weight, setWeight] = useState({
    user: "",
    weight: 0
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [needWeight, setNeedWeight] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorOnPage, setErrorOnPage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const todaysWeight = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/${client._id}`
      );

      if (!isEmpty(todaysWeight.data)) {
        const latestWeight = moment(todaysWeight.data.date).format(
          "dddd, MMMM Do YYYY"
        );

        setNeedWeight(
          moment().format("dddd, MMMM Do YYYY") === latestWeight ? false : true
        );

        setLoading(false);
      }
    }

    fetchData();
  }, [client]);

  const updateWeight = e => {
    setWeight({
      user: client._id,
      weight: e.target.value
    });

    setSubmitDisabled(e.target.value.length < 3);
  };

  const submitWeight = async e => {
    //Should something be setup in the service to then calculate the weekly average?
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/daily-log`,
        weight
      );
      setLoading(false);
      setNeedWeight(false);
      setErrorOnPage(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setErrorOnPage(true);
      setSubmitDisabled(true);
    }
  };

  const weightFormRender = () => {
    if (needWeight) {
      return (
        <form className="client-landing-daily-inputs--weight">
          <TextField
            label="Weight"
            type="text"
            margin="normal"
            onChange={updateWeight}
            onKeyPress={isNumberKey}
            inputProps={{
              minLength: 2,
              maxLength: 5
            }}
            required
          />
          <CardActions>
            <Button
              disabled={submitDisabled}
              onClick={submitWeight}
              variant="contained"
              color="primary"
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
      return <h4>Thank you for submitting your weight today!</h4>;
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <h3>Weight</h3>
        {loading ? <CircularProgress /> : weightFormRender()}
      </CardContent>
    </Card>
  );
}
