import React from "react";
import { Playbook } from "../App";

export default function PlaybookDetail({ playbook, returnBack }: { playbook: Playbook, returnBack: ()=>void }) {
  return (
    <>
      <button onClick={(()=>returnBack())}>X</button>
      <div>{playbook.playbook_name}</div>
    </>
  );
}
