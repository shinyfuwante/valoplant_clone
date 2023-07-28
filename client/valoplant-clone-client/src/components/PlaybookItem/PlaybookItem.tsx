import React from "react";

export default function PlaybookItem({
  x,
  y,
  display_icon,
}: {
  x: number;
  y: number;
  display_icon: string;
}) {
  const itemStyle: React.CSSProperties = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
  };
  const picStyle: React.CSSProperties = {
    width: `45px`,
    height: `auto`,
  };
  return (
    <div className="playbook-item" style={itemStyle}>
      <img src={display_icon} style={picStyle}></img>
    </div>
  );
}
