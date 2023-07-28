import React from "react";
import { Playbook } from "../../App";
import "./PlaybookDetail.css";
import PlaybookItem from "../PlaybookItem/PlaybookItem";

export default function PlaybookDetail({
  playbook,
  returnBack,
}: {
  playbook: Playbook;
  returnBack: () => void;
}) {
  const agent_skills = playbook.agent_skills;
  
  return (
    <>
      <button onClick={() => returnBack()}>X</button>
      <div className="playbook-image-container">
        <img className="playbook-image" src={playbook.minimap}></img>
        {playbook.lineups.map((lineup) => (
          <PlaybookItem
            key={lineup.id}
            x={lineup.dest_x}
            y={lineup.dest_y}
            display_icon={playbook.agent_skills[lineup.skill_type].displayIcon}
          ></PlaybookItem>
        ))}
      </div>
    </>
  );
}
