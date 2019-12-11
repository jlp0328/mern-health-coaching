import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

//Modify date
const dateFormat = require("dateformat");
let weekstart;

export default function ClientMainSummaryCard(props) {
  if (props.client !== null) {
    weekstart = dateFormat(props.client.weekstart, "fullDate");
  }

  return (
    <Card>
      <CardContent>
        <div className="client-landing-summary-card">
          <div className="client-landing-summary-card--left">
            <h3>
              Current Weekly Average: <span>145</span>
            </h3>
            <h3>Goals for this week...</h3>
            <ul>
              <li>
                Carbs:
                {props.client !== null ? (
                  <span>{props.client.carbs}</span>
                ) : (
                  <span> TBD</span>
                )}
              </li>
              <li>
                Protein:
                {props.client !== null ? (
                  <span>{props.client.protein}</span>
                ) : (
                  <span> TBD</span>
                )}
              </li>
              <li>
                Fat:
                {props.client !== null ? (
                  <span>{props.client.fat}</span>
                ) : (
                  <span> TBD</span>
                )}
              </li>
            </ul>
          </div>
          <div className="client-landing-summary-card--right">
            <h3>
              Your next weekly checkin is: <span>{weekstart}</span>
            </h3>
            <h3>
              Your next monthly checkin is: <span>Monday, January 3</span>
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
