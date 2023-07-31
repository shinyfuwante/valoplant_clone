import React from "react";
import { useState } from "react";
import { Agent, ValMap } from "../App";
import AgentSelector from "./AgentSelector/AgentSelector";
import MapSelector from "./MapSelector/MapSelector";

export default function UploadPlaybookForm({
  availableMaps,
  availableAgents,
}: {
  availableMaps: ValMap[];
  availableAgents: Agent[];
}) {
  const backendUrl = "http://127.0.0.1:8000/playbooks/";
  const [agent, setAgent] = useState<Agent>();
  const [map, setMap] = useState<ValMap>();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    const data = new FormData();
    data.append("agent", agent!.display_name);
    data.append("map_name", map!.display_name);
    fetch(backendUrl, {
      method: "POST",
      body: data,
    });
  };
  return (
    <>
      <form action={backendUrl} method="post"></form>
      <AgentSelector setAgent={setAgent} availableAgents={availableAgents}/>
      <MapSelector setMap={setMap} availableMaps={availableMaps}/>
      {/* <input
        type="text"
        name="map"
        id="map"
        onChange={(e) => setMap(e.target.value)}
      /> */}
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </>
  );
}
