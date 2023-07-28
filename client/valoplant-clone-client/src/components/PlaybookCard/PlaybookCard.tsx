import React from "react";
import { Playbook } from "../../App";
import "./PlaybookCard.css";

export default function PlaybookCard({ playbook, onCardClick }: { playbook: Playbook, onCardClick:(playbook: Playbook) => void }) {
  return (
    <div className="PlaybookCardContainer" onClick={() => onCardClick(playbook)}>
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
