import React from "react";
import * as moment from "moment";
import { isUndefined } from "lodash";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function ClientMainSummaryCard({ client: { goals, personal } }) {
  //How to deal with change of year!!
  let nextCheckIn;
  let nextMonthlyCheckin;

  //Weekly Checkin Date
  const checkinday = moment().day(personal.checkinday)._d;

  if (!isUndefined(checkinday)) {
    nextCheckIn =
      moment() > checkinday
        ? moment(checkinday)
            .add(1, "weeks")
            .format("dddd, MMMM Do")
        : checkinday;

    //Monthly Checkin Date
    const month = moment().format("M");
    const year = moment().format("YYYY");
    const today = moment();
    const currentMonth = moment(
      new Date(`${month} / ${personal.monthlycheckin} / ${year}`)
    );

    const upcoming = moment(currentMonth)
      .add(1, "months")
      .format("dddd, MMMM Do");

    nextMonthlyCheckin =
      today > currentMonth
        ? upcoming
        : moment(currentMonth).format("dddd, MMMM Do");
  }

  return (
    <Card className="client-main--summary-card" elevation={3}>
      <CardContent>
        <div className="client-landing-summary-card">
          <div className="client-landing-summary-card--left">
            <p className="client-main--summary-headings">
              Current Weekly Average: <span>145</span>
            </p>
            <p className="client-main--summary-headings">
              Goals for this week...
            </p>
            <ul>
              <li>
                Carbs:
                {goals !== null ? (
                  <span> {goals.carbs}</span>
                ) : (
                  <span> TBD</span>
                )}
              </li>
              <li>
                Protein:
                {goals !== null ? (
                  <span> {goals.protein}</span>
                ) : (
                  <span> TBD</span>
                )}
              </li>
              <li>
                Fat:
                {goals !== null ? <span> {goals.fat}</span> : <span> TBD</span>}
              </li>
            </ul>
          </div>
          <div className="client-landing-summary-card--right">
            <p className="client-main--summary-headings">
              Your next weekly checkin is: <span>{nextCheckIn}</span>
            </p>
            <p className="client-main--summary-headings">
              Your next monthly checkin is: <span>{nextMonthlyCheckin}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
