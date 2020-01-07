import React, { Component } from "react";
import moment from "moment";
import "./ClientMain.css";

import Paper from "@material-ui/core/Paper";

import ClientMainSummaryCard from "./ClientMainSummaryCard";
import ClientMainForm from "./ClientMainForm";

const DATE_NOW = moment().format("dddd, MMMM Do");

export default class ClientMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.client !== prevState.client) {
      return {
        client: nextProps.client
      };
    }
    return;
  }

  render() {
    return (
      <Paper className="client-main--landing" square={false} elevation={3}>
        <h1>{DATE_NOW}</h1>
        <div className="client-main--summary-and-daily-logs">
          <ClientMainSummaryCard client={this.state.client} />
          <ClientMainForm client={this.state.client.personal} />
        </div>
      </Paper>
    );
  }
}
