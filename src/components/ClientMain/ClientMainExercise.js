import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { isNull, isEmpty } from "lodash";

import DailyInputsFields from "./DailyInputsFields";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const inputData = require("./data/exercise-inputs.json");

export default class ClientMainExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: this.props.client,
      time: "",
      type: "",
      notes: "",
      submitDisabled: true,
      needExercise: true,
      loading: true
    };

    console.log(this.props);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const todaysExercise = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/exercise/${this.props.client._id}`
      );

      if (!isEmpty(todaysExercise.data || !isNull(todaysExercise.data))) {
        const today = moment().format();
        const latestExercise = moment(todaysExercise.data[0].date).format(
          "dddd, MMMM Do YYYY"
        );

        this.setState({
          needExercise: today === latestExercise ? false : true,
          loading: false
        });
      } else {
        this.setState({
          loading: false
        });
      }
    }
  }

  updateExercise = e => {
    let update = {};
    update[e.target.name] = e.target.value;
    this.setState(update);
    this.toggleSubmitButton(e);
  };

  toggleSubmitButton(e) {
    let disable =
      (e.target.value === "" && e.target.name !== "notes") ||
      this.state.time === "" ||
      this.state.type === "";

    this.setState({
      submitDisabled: disable
    });
  }

  submitExercise = async e => {
    e.preventDefault();

    let { time, type, notes } = this.state;
    time = parseInt(time);

    const todaysExercise = {
      user: this.props.client._id,
      time,
      type,
      notes
    };

    this.setState({
      loading: true
    });

    // await axios.post(
    // 	`http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/daily-log`,
    // 	todaysExercise,
    // );
  };

  createInputList = () => {
    return inputData.map((elem, index) => {
      return (
        <DailyInputsFields
          key={index}
          attributes={elem}
          change={this.updateExercise}
        />
      );
    });
  };

  exerciseFormRender = () => {
    if (this.state.needExercise) {
      return (
        <form noValidate className="client-landing-daily-inputs--exercise">
          {this.createInputList()}
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={this.state.submitDisabled}
              onClick={this.submitExercise}
            >
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
      <Card elevation={3}>
        <CardContent>
          <h3>Exercise</h3>
          {exerciseForm}
        </CardContent>
      </Card>
    );
  }
}
