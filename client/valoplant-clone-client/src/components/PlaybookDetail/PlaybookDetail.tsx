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
  const handleClickOnImage = (e) => {
    // console.log(`x: ${e.nativeEvent.offsetX}`);
    // console.log(`y: ${e.nativeEvent.offsetY}`);
  }
  return (
    <>
      <button onClick={() => returnBack()}>X</button>
      <div className="playbook-image-container">
        <img className="playbook-image" onClick = {(e) => handleClickOnImage(e)}src={playbook.minimap}></img>
        {playbook.lineups.map((lineup) => (
          <PlaybookItem
            key={lineup.id}
            lineup = {lineup}
            display_icon={playbook.agent_skills[lineup.skill_type].displayIcon}
            agent_icon ={playbook.agent_image}
          ></PlaybookItem>
        ))}
      </div>
    </>
  );
}
