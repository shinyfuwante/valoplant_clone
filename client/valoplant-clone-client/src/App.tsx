import { useEffect, useState } from "react";
import "./App.css";
import UploadLineUpForm from "./components/UploadLineUpForm";
import UploadPlaybookForm from "./components/UploadPlayBookForm";
import PlaybookCard from "./components/PlaybookCard/PlaybookCard";
import PlaybookDetail from "./components/PlaybookDetail/PlaybookDetail";

export interface Playbook {
  agent: string;
  agent_image: string;
  map_name: string;
  playbook_name: string;
  id: number;
  map_image: string;
  minimap: string;
  lineups: Lineup[];
  agent_skills: Skill[];
}

export interface Lineup {
  id: number;
  dest_x: number;
  dest_y: number;
  source_x: number;
  source_y: number;
  stand_img: string;
  aim_img: string;
  skill_type: number;
  is_attack_sided: boolean;
  notes: string;
}

export interface Skill {
  displayName: string;
  displayIcon: string;
}
export interface ValMap {
  display_name: string;
  display_icon: string;
  minimap: string;
}
export interface Agent {
  display_name: string;
  display_icon: string;
  id: number;
}

function App() {
  const backendUrl = "http://127.0.0.1:8000/";
  const testing = false;
  const [data, setData] = useState<Playbook[]>();
  const [availableAgents, setAvailableAgents] = useState<Agent[]>();
  const [availableMaps, setAvailableMaps] = useState<ValMap[]>();
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>();
  let playbookCards;

  if (data) {
    playbookCards = data.map((playbook) => (
      <PlaybookCard
        key={playbook.id}
        onCardClick={(playbook) => setSelectedPlaybook(playbook)}
        playbook={playbook}
      ></PlaybookCard>
    ));
  }
  const handleReturn = () => setSelectedPlaybook(null);
  const getPlaybooks = async () => {
    const response = await fetch(backendUrl + "playbooks/");
    const json = await response.json();
    setData(json);
  };
  const getAvailableInfo = async () => {
    const agentsResponse = await fetch(backendUrl + "fetch_agents/");
    const agentsJson = await agentsResponse.json();
    setAvailableAgents(agentsJson);
    const mapsResponse = await fetch(backendUrl + "fetch_maps/");
    const mapsJson = await mapsResponse.json();
    setAvailableMaps(mapsJson);
  };
  useEffect(() => {
    getPlaybooks();
    getAvailableInfo();
  }, []);

  return (
    <>
      <>
        {selectedPlaybook ? (
          <PlaybookDetail
            playbook={selectedPlaybook}
            returnBack={handleReturn}
          ></PlaybookDetail>
        ) : (
          data && <>{playbookCards}</>
        )}
      </>
      <>
        {testing ? (
          <>
            <UploadPlaybookForm />
            <br></br>
            -------------------
            <UploadLineUpForm />{" "}
          </>
        ) : (
          <></>
        )}
      </>
    </>
  );
}

export default App;
