import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import DailyInputsFields from "./DailyInputsFields";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const inputData = require("./data/macros-inputs.json");

export default class ClientMainMacros extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: this.props.client,
      carbs: "",
      protein: "",
      fat: "",
      fiber: "",
      submitDisabled: true,
      needMacros: true,
      loading: true
    };
  }

  async componentDidUpdate() {
    const todaysMacros = await axios.get(
      `http://${process.env.REACT_APP_BACKEND_IP}:5000/macros/${this.props.client._id}`
    );

    if (todaysMacros.data !== null) {
      const today = moment().format();
      const latestMacros = moment(todaysMacros.data.date).format(
        "dddd, MMMM Do YYYY"
      );

      this.setState({
        needMacros: today === latestMacros ? false : true,
        loading: false
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  updateMacros = e => {
    let update = {};
    let disable =
      Object.values(this.state).includes(" ") ||
      Object.values(this.state).includes(NaN) ||
      e.target.value === "";

    // How to use??
    // console.log(isNan(e.target.value));

    update["submitDisabled"] = disable;
    update[e.target.name] = parseInt(e.target.value);
    this.setState(update);
    console.log(this.state);
  };

  submitMacros = async e => {
    e.preventDefault();
    let { carbs, protein, fat, fiber } = this.state;

    const todaysMacros = {
      user: this.props.client._id,
      carbs,
      protein,
      fat,
      fiber
    };

    console.log(todaysMacros);
    this.setState({
      loading: true
    });

    // await axios.post(
    // 	`http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/daily-log`,
    // 	todaysMacros,
    // );
  };

  createInputList = () => {
    return inputData.map((elem, index) => {
      return (
        <DailyInputsFields
          key={index}
          attributes={elem}
          change={this.updateMacros}
        />
      );
    });
  };

  macrosFormRender = () => {
    if (this.state.needMacros) {
      return (
        <form noValidate className="client-landing-daily-inputs--macros">
          {this.createInputList()}
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={this.state.submitDisabled}
              onClick={this.submitMacros}
            >
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
      <Card elevation={3}>
        <CardContent>
          <h3>Macros</h3>
          {macrosForm}
        </CardContent>
      </Card>
    );
  }
}
