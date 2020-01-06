import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
// import Datepicker from "../Datepicker/Datepicker";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import ClientMainWeight from "./ClientMainWeight";
import ClientMainMacros from "./ClientMainMacros";
import ClientMainExercise from "./ClientMainExercise";

export default function ClientMainDailyInputs({ client }) {
  const [entryDate, setEntryDate] = useState(new Date());
  const [formType, setFormType] = useState("weight");

  let formMap = new Map();
  formMap.set("weight", <ClientMainWeight client={client} date={entryDate} />);
  formMap.set("macros", <ClientMainMacros client={client} />);
  formMap.set("exercise", <ClientMainExercise client={client} />);

  const changeDate = date => {
    setEntryDate(date);
  };

  const changeForm = ev => {
    setFormType(ev.target.value);
  };

  //   const determineForm = () => {
  //       if(formType === 'weight'){

  //       } else if(formType)
  //   }

  return (
    <Card elevation={3} className="client-main--daily-card">
      <CardContent>
        <div className="client-landing-daily-inputs">
          <div className="client-landing-daily--date-and-entry">
            <div className="datepicker-component-container">
              <label>Date: </label>
              <div>
                <DatePicker selected={entryDate} onChange={changeDate} />
              </div>
            </div>
            <FormControl>
              <InputLabel htmlFor="daily-form-native-helper">
                Entry Type
              </InputLabel>
              <NativeSelect
                value={formType}
                onChange={changeForm}
                inputProps={{
                  name: "daily-form",
                  id: "daily-form-native-helper"
                }}
              >
                <option value={"weight"}>Weight</option>
                <option value={"macros"}>Macros</option>
                <option value={"exercise"}>Exercise</option>
              </NativeSelect>
            </FormControl>
          </div>
          <div className="client-landing-daily--entry-form">
            {formMap.get(formType)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
