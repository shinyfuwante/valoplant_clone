import React from "react";
import { useState } from "react";

export default function UploadPlaybookForm() {
  const backendUrl = "http://127.0.0.1:8000/playbooks/";
  const [agent, setAgent] = useState("");
  const [map, setMap] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    const data = new FormData();
    data.append("agent", agent);
    data.append("map_name", map);
    fetch(backendUrl, {
      method: "POST",
      body: data,
    });
  };

  return (
    <>
      <form action={backendUrl} method="post"></form>
      <input
        type="text"
        name="agent"
        id="agent"
        onChange={(e) => setAgent(e.target.value)}
      />
      <input
        type="text"
        name="map"
        id="map"
        onChange={(e) => setMap(e.target.value)}
      />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </>
  );
}
