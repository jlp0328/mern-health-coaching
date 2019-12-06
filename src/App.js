import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import ClientMain from "./components/ClientMain";
import ClientNav from "./components/ClientNav";
import CheckIn from "./components/CheckIn";
import Macros from "./components/Macros";
import Measurements from "./components/Measurements";
import Profile from "./components/Profile";
import Weight from "./components/Weight";

import "./App.css";

const drawerWidth = 240;

//Will need to come back and add Redux to manage state when drawer is open to shift main's contents
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personal: {},
      goals: {}
    };
  }
  async componentDidMount() {
    try {
      const getClientInfo = axios.get(
        "http://10.0.1.3:5000/clients/5de929b2daf74a9981968987"
      );

      const getClientGoals = axios.get(
        "http://10.0.1.3:5000/clients/goals/5de92ab896558099cbcdbdde"
      );

      const clientInfo = await axios.all([getClientInfo, getClientGoals]);
      this.setState({
        personal: clientInfo[0].data,
        goals: clientInfo[1].data
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <ClientNav />
          <main className="main-page-container">
            <Route
              exact
              path="/"
              render={props => <ClientMain client={this.state} />}
            />
            <Route path="/profile" component={Profile} />
            <Route path="/weight" component={Weight} />
            <Route path="/macros" component={Macros} />
            <Route path="/measurements" component={Measurements} />
            <Route path="/check-in" component={CheckIn} />
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
