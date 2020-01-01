import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { isEmpty, isNull } from "lodash";

import DailyInputsFields from "./DailyInputsFields";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const inputData = require("./data/macros-inputs.json");

export default function ClientMainMacros({ client }) {
  const [macrosData, setMacrosData] = useState({
    user: "",
    carbs: "",
    protein: "",
    fat: "",
    fiber: ""
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [needMacros, setNeedMacros] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorOnPage, setErrorOnPage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const todaysMacros = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/macros/${client._id}`
      );

      if (!isEmpty(todaysMacros.data)) {
        const latestMacros = moment(todaysMacros.data.date).format(
          "dddd, MMMM Do YYYY"
        );

        setNeedMacros(
          moment().format("dddd, MMMM Do YYYY") === latestMacros ? false : true
        );

        setMacrosData({
          user: client._id,
          carbs: "",
          protein: "",
          fat: "",
          fiber: ""
        });

        setLoading(false);
      }
    }

    fetchData();
  }, [client]);

  const createInputList = () => {
    return inputData.map((elem, index) => {
      return (
        <DailyInputsFields
          key={index}
          attributes={elem}
          change={updateMacros}
        />
      );
    });
  };

  const updateMacros = e => {
    let update = macrosData;
    let disable =
      Object.values(macrosData).includes(" ") ||
      Object.values(macrosData).includes(NaN) ||
      e.target.value === "";

    setSubmitDisabled(disable);
    update[e.target.name] = parseInt(e.target.value);
    setMacrosData(update);
  };

  const submitMacros = async e => {
    e.preventDefault();

    try {
      await axios.post(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/macros/daily-log`,
        macrosData
      );

      setLoading(false);
      setNeedMacros(false);
      setErrorOnPage(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorOnPage(true);
      setSubmitDisabled(true);
    }
  };

  const macrosFormRender = () => {
    if (needMacros) {
      return (
        <form noValidate className="client-landing-daily-inputs--macros">
          {createInputList()}
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={submitDisabled}
              onClick={submitMacros}
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
      return <h4>Thank you for submitting your macros today!</h4>;
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <h3>Macros</h3>
        {loading ? <CircularProgress /> : macrosFormRender()}
      </CardContent>
    </Card>
  );
}
