import React, { Component } from "react";
import axios from "axios";
import dateFormat from "dateformat";

import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

import { isNumberKey } from "../../Common";

const DATE_NOW = new Date();

export default class ClientMainWeight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: this.props.client,
      weight: "",
      needWeight: true,
      loading: true
    };
  }

  async componentDidUpdate() {
    const todaysWeight = await axios.get(
      `http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/${this.props.client._id}`
    );

    if (todaysWeight.data !== null) {
      const today = dateFormat(DATE_NOW, "fullDate");
      const latestWeight = dateFormat(todaysWeight.data[0].date, "fullDate");

      this.setState({
        needWeight: today === latestWeight ? false : true,
        loading: false
      });
    }
  }

  updateWeight = e => {
    this.setState({
      weight: e.target.value
    });
  };

  submitWeight = async e => {
    e.preventDefault();
    const todaysWeight = {
      user: this.props.client._id,
      weight: this.state.weight
    };

    await axios.post(
      `http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/daily-log`,
      todaysWeight
    );
  };

  weightFormRender = () => {
    if (this.state.needWeight) {
      return (
        <form className="client-landing-daily-inputs--left">
          <TextField
            label="Weight"
            type="text"
            margin="normal"
            onChange={this.updateWeight}
            onKeyPress={isNumberKey}
            inputProps={{
              minLength: 2,
              maxLength: 5
            }}
            required
          />
          <CardActions>
            <Button
              onClick={this.submitWeight}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </CardActions>
        </form>
      );
    } else {
      return <h4>Thank you for submitting your weight today!</h4>;
    }
  };

  render() {
    let weightForm;

    if (this.state.loading) {
      weightForm = <CircularProgress />;
    } else {
      weightForm = this.weightFormRender();
    }

    return (
      <div>
        <h3>Weight</h3>
        {weightForm}
      </div>
    );
  }
}
