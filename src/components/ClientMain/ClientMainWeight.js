import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

import { isNumberKey } from "../../Common";

export default class ClientMainWeight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: this.props.client,
      weight: "",
      submitDisabled: true,
      needWeight: true,
      loading: true
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const todaysWeight = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/${this.props.client._id}`
      );

      if (todaysWeight.data !== null) {
        // const today = dateFormat(DATE_NOW, 'fullDate');
        const today = moment().format();
        const latestWeight = moment(todaysWeight.data[0].date).format(
          "dddd, MMMM Do YYYY"
        );

        this.setState({
          needWeight: today === latestWeight ? false : true,
          loading: false
        });
      } else {
        this.setState({
          loading: false
        });
      }
    }
  }

  updateWeight = e => {
    console.log(e.target.value.length);
    if (e.target.value.length < 3) {
      this.setState({
        weight: e.target.value,
        submitDisabled: true
      });
    } else {
      this.setState({
        weight: e.target.value,
        submitDisabled: false
      });
    }
  };

  submitWeight = async e => {
    e.preventDefault();
    let { weight } = this.state;
    const todaysWeight = {
      user: this.props.client._id,
      weight
    };

    this.setState({
      loading: true
    });

    await axios.post(
      `http://${process.env.REACT_APP_BACKEND_IP}:5000/weight/daily-log`,
      todaysWeight
    );
  };

  weightFormRender = () => {
    if (this.state.needWeight) {
      return (
        <form className="client-landing-daily-inputs--weight">
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
              disabled={this.state.submitDisabled}
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
      <Card elevation={3}>
        <CardContent>
          <h3>Weight</h3>
          {weightForm}
        </CardContent>
      </Card>
    );
  }
}
