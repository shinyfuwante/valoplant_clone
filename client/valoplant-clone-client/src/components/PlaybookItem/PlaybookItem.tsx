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
    top: `${lineup.source_y}px`
  }

  const lineup_open = <img src={agent_icon} style={{...agentStyle, ...picStyle}}></img>

  return (
    <div className="playbook-item" style={itemStyle} onClick = { () => setExpandLineup(!expandLineup)}>
      <img src={display_icon} style={picStyle}></img>
      {expandLineup ? lineup_open: <></>}
    </div>
  );
}
