import React from "react";
import { useState } from "react";

export default function UploadLineUpForm() {
  const backendUrl = "http://127.0.0.1:8000/playbooks/1/";
  const [destX, setDestX] = useState<number>(0.0);
  const [destY, setDestY] = useState<number>(0.0);
  const [sourceX, setSourceX] = useState(0.0);
  const [sourceY, setSourceY] = useState(0.0);
  const [standImg, setStandImg] = useState<File>();
  const [aimImg, setAimImg] = useState<File>();
  const [skillType, setSkillType] = useState(0);
  const [attackSided, setAttackSided] = useState(false);
  const [notes, setNotes] = useState("");
  const [playbook, setPlaybook] = useState<number>();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked');
    const data = new FormData();
    data.append("dest_x", destX);
    data.append("dest_y", destY);
    data.append("source_x", sourceX);
    data.append("source_y", sourceY);
    data.append("stand_img", standImg);
    data.append("aim_img", aimImg);
    data.append("skill_type", skillType);
    data.append("is_attack_sided", attackSided);
    data.append("notes", notes);
    data.append("playbook", playbook);

    console.log(data);
    fetch(backendUrl, {
        method: 'POST',
        body: data,
    })
  };

  return (
    <>
      <form action={backendUrl} method="post"></form>
      <input
        type="number"
        name="destX"
        id="destX"
        onChange={(e) => setDestX(e.target.value)}
      />
      <input
        type="number"
        name="destY"
        id="destY"
        onChange={(e) => setDestY(e.target.value)}
      />
      <input
        type="number"
        name="sourceX"
        id="sourceX"
        onChange={(e) => setSourceX(e.target.value)}
      />
      <input
        type="number"
        name="sourceY"
        id="sourceY"
        onChange={(e) => setSourceY(e.target.value)}
      />
      <input
        type="file"
        name="standImg"
        id="standImg"
        onChange={(e) => setStandImg(e.target.files[0])}
      />
      <input
        type="file"
        name="aimImg"
        id="aimImg"
        onChange={(e) => setAimImg(e.target.files[0])}
      />
      <input
        type="number"
        name="skillType"
        id="skillType"
        onChange={(e) => setSkillType(e.target.value)}
      />
      <input
        type="checkbox"
        name="attackSided"
        id="attackSided"
        onChange={(e) => setAttackSided(e.target.checked)}
      />
      <input
        type="text"
        name="notes"
        id="notes"
        onChange={(e) => setNotes(e.target.value)}
      />
      <input
        type="number"
        name="playbook"
        id="playbook"
        onChange={(e) => setPlaybook(e.target.value)}
      />
      <button onClick={e=>handleSubmit(e)}>Submit</button>
    </>
  );
}
