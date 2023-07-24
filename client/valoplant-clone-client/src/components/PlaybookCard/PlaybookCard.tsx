import React from "react";
import { Playbook } from "../../App";
import "./PlaybookCard.css";

export default function PlaybookCard({ playbook }: { playbook: Playbook }) {
  return (
    <div className="PlaybookCardContainer">
        <img src={playbook.map_image}></img>
        <div className="PlaybookNameAndAgent">
            <span>{playbook.playbook_name}</span>
          <img className="PlayBookCardAgentImage"
            src={playbook.agent_image}
          ></img>
        </div>
    </div>
  );
}
