import React, { Component } from "react";
import axios from "axios";
import dateFormat from "dateformat";

import DailyInputsFields from "./DailyInputsFields";

import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

import { isNumberKey } from "../../Common";

const inputData = require("./data/macros-inputs.json");

const DATE_NOW = new Date();

export default class ClientMainMacros extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: this.props.client,
      carbs: "",
      protein: "",
      fat: "",
      fiber: "",
      needMacros: true,
      loading: false
    };
  }

  async componentDidUpdate() {
    const todaysMacros = await axios.get(
      `http://${process.env.REACT_APP_BACKEND_IP}:5000/macros/${this.props.client._id}`
    );

    // const todaysExercise = await axios.get(
    //   `http://${process.env.REACT_APP_BACKEND_IP}:5000/exercise/${this.props.client._id}`
    // );

    if (todaysMacros.data !== null) {
      const today = dateFormat(DATE_NOW, "fullDate");
      const latestMacros = dateFormat(todaysMacros.data[0].date, "fullDate");

      this.setState({
        needMacros: today === latestMacros ? false : true,
        loading: false
      });
    }
  }

  //Need to fix and update in the component being generated for both exercise and macros
  updateMacros = e => {
    let update = {};
    update[e.target.name] = e.target.value;
    this.setState(update);
    console.log(this.state);
  };

  createInputList = () => {
    return inputData.map((elem, index) => {
      return (
        <DailyInputsFields
          key={index}
          attributes={elem}
          onChange={this.updateMacros}
          onKeyPress={isNumberKey}
        />
      );
    });
  };

  macrosFormRender = () => {
    if (this.state.needMacros) {
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
      return <h3>Thank you for submitting your macros today!</h3>;
    }
  };

  render() {
    let macrosForm;

    if (this.state.loading) {
      macrosForm = <CircularProgress />;
    } else {
      macrosForm = this.macrosFormRender();
    }

    return (
      <div>
        <h3>Macros</h3>
        {macrosForm}
      </div>
    );
  }
}
