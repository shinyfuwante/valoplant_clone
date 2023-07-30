import React from "react";
import { useState } from "react";
import { Lineup } from "../../App";

export default function PlaybookItem({
  lineup,
  display_icon,
  agent_icon,
}: {
  lineup: Lineup;
  display_icon: string;
  agent_icon: string;
}) {
  const [expandLineup, setExpandLineup] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  
  const showDetailsStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: "1",
    left: `0px`,
    top: `0px`,
  };
  const itemStyle: React.CSSProperties = {
    position: "absolute",
    left: `${lineup.dest_x}px`,
    top: `${lineup.dest_y}px`,
  };
  const picStyle: React.CSSProperties = {
    width: `45px`,
    height: `auto`,
  };

  const agentStyle: React.CSSProperties = {
    position: "absolute",
    left: `${lineup.source_x}px`,
    top: `${lineup.source_y}px`,
  };
  const source_image = lineup.stand_img ? <div>
    <div>Where to stand:</div>
    <img src={lineup.stand_img}></img>
  </div> : <></>;
  const lineup_open = (
    <div>
      <button style={showDetailsStyle} onClick={() => setShowDetails(!showDetails)}>Show/Expand Details</button>
      {showDetails ? <div>
        {source_image}
      </div> : <></>}
      <img src={agent_icon} style={{ ...agentStyle, ...picStyle }}></img>
    </div>
  );

  return (
    <div
      className="playbook-item"
      style={itemStyle}
    >
      <img src={display_icon} style={picStyle} onClick={() => setExpandLineup(!expandLineup)}></img>
      {expandLineup ? lineup_open : <></>}
    </div>
  );
}
