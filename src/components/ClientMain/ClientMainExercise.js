import React, { Component } from "react";
import axios from "axios";
import dateFormat from "dateformat";

import DailyInputsFields from "./DailyInputsFields";

import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";

import { isNumberKey } from "../../Common";

const inputData = require("./data/exercise-inputs.json");

const DATE_NOW = new Date();

export default class ClientMainExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: this.props.client,
      time: 0,
      type: "",
      notes: "",
      needExercise: true,
      loading: false
    };
  }

  async componentDidUpdate() {
    const todaysExercise = await axios.get(
      `http://${process.env.REACT_APP_BACKEND_IP}:5000/exercise/${this.props.client._id}`
    );

    if (todaysExercise.data !== null) {
      const today = dateFormat(DATE_NOW, "fullDate");
      const latestExercise = dateFormat(
        todaysExercise.data[0].date,
        "fullDate"
      );

      this.setState({
        needExercise: today === latestExercise ? false : true,
        loading: false
      });
    }
  }

  updateExercise = e => {
    let update = {};
    update[e.target.name] = e.target.value;
    this.setState(update);
  };

  createInputList = () => {
    return inputData.map((elem, index) => {
      return (
        <DailyInputsFields
          key={index}
          attributes={elem}
          onChange={this.updateExercise}
          onKeyPress={isNumberKey}
        />
      );
    });
  };

  exerciseFormRender = () => {
    if (this.state.needExercise) {
      return (
        <form className="client-landing-daily-inputs--right">
          {this.createInputList()}
          <CardActions>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </CardActions>
        </form>
      );
    } else {
      return <h3>Thank you for submitting your exercise today!</h3>;
    }
  };

  render() {
    let exerciseForm;

    if (this.state.loading) {
      exerciseForm = <CircularProgress />;
    } else {
      exerciseForm = this.exerciseFormRender();
    }

    return (
      <div>
        <h3>Exercise</h3>
        {exerciseForm}
      </div>
    );
  }
}
