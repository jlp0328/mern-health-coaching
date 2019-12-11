import React from "react";

import ClientMainWeight from "./ClientMainWeight";
import ClientMainMacros from "./ClientMainMacros";
import ClientMainExercise from "./ClientMainExercise";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function ClientMainDailyInputs({ client }) {
  return (
    <Card>
      <CardContent>
        <h3>Update Today's Numbers</h3>
        <div className="client-landing-daily-inputs">
          <ClientMainWeight client={client} />
          <ClientMainMacros client={client} />
          <ClientMainExercise client={client} />
        </div>
      </CardContent>
    </Card>
  );
}
