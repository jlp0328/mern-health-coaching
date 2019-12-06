import React, { Component } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

export default class ClientMainDailyInputs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: this.props.client
    };
  }

  submitWeight = () => {};

  render() {
    return (
      <Card>
        <CardContent>
          <h1>{this.props.client.firstname}</h1>
          <h3>Update Today's Numbers</h3>
          <div className="client-landing-daily-inputs">
            <form className="client-landing-daily-inputs--left">
              <TextField
                label="Weight"
                type="number"
                autoComplete="145"
                margin="normal"
                required
              />
              <CardActions>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </CardActions>
            </form>
            <form className="client-landing-daily-inputs--right">
              <TextField
                label="Carbs"
                type="number"
                autoComplete="145"
                margin="normal"
                required
              />
              <TextField
                label="Protein"
                type="number"
                autoComplete="145"
                margin="normal"
                required
              />
              <TextField
                label="Fat"
                type="number"
                autoComplete="57"
                margin="normal"
                required
              />
              <TextField
                label="Fiber"
                type="number"
                autoComplete="25"
                margin="normal"
                required
              />
              <TextField
                label="Exercise"
                type="text"
                margin="normal"
                multiline
                rows="2"
                required
              />
              <TextField
                label="Notes"
                type="text"
                margin="normal"
                multiline
                rows="4"
              />
              <CardActions>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </CardActions>
            </form>
          </div>
        </CardContent>
      </Card>
    );
  }
}
