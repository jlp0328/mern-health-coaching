import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { isEmpty } from "lodash";

import DailyInputsFields from "./DailyInputsFields";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const inputData = require("./data/exercise-inputs.json");

export default function ClientMainExercise({ client }) {
  const [exerciseData, setExerciseData] = useState({
    user: "",
    time: 0,
    type: "",
    notes: ""
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [needExercise, setNeedExercise] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorOnPage, setErrorOnPage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const todaysExercise = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/exercise/${client._id}`
      );

      if (!isEmpty(todaysExercise.data)) {
        const latestExercise = moment(todaysExercise.data.date).format(
          "dddd, MMMM Do YYYY"
        );

        setNeedExercise(
          moment().format("dddd, MMMM Do YYYY") === latestExercise
            ? false
            : true
        );
        setExerciseData({
          user: client._id,
          time: 0,
          type: "",
          notes: ""
        });
        setLoading(false);
      }
    }

    fetchData();
  }, [client]);

  const submitExercise = async e => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/exercise/daily-log`,
        exerciseData
      );
      setLoading(false);
      setNeedExercise(false);
      setErrorOnPage(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorOnPage(true);
      setSubmitDisabled(true);
    }
  };

  const updateExercise = e => {
    let update = exerciseData;
    update[e.target.name] =
      e.target.name === "time" ? parseInt(e.target.value) : e.target.value;
    setExerciseData(update);
    toggleSubmitButton(e);
  };

  const toggleSubmitButton = e => {
    let disable =
      (e.target.value === "" && e.target.name !== "notes") ||
      exerciseData.time === "" ||
      exerciseData.type === "";

    setSubmitDisabled(disable);
  };

  const createInputList = () => {
    return inputData.map((elem, index) => {
      return (
        <DailyInputsFields
          key={index}
          attributes={elem}
          change={updateExercise}
        />
      );
    });
  };

  const exerciseFormRender = () => {
    if (needExercise) {
      return (
        <form noValidate className="client-landing-daily-inputs--exercise">
          {createInputList()}
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={submitDisabled}
              onClick={submitExercise}
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
      return <h4>Thank you for submitting your exercise today!</h4>;
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        {loading ? <CircularProgress /> : exerciseFormRender()}
      </CardContent>
    </Card>
  );
}
