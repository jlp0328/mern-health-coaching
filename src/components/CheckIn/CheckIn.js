import React, { useEffect, useState } from "react";

export default function CheckIn({ client }) {
  const [formUrl, setFormUrl] = useState("");

  useEffect(() => {
    setFormUrl(`${client.form}?embedded=true`);
    document.getElementById("user-weekly-check-in").src = formUrl;
  }, [client, formUrl]);

  return (
    <iframe
      id="user-weekly-check-in"
      width="950"
      height="680"
      title="check-in-form"
    >
      Loading…
    </iframe>
  );
}
