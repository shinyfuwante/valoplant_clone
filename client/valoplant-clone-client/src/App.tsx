import { useEffect, useState } from "react";
import "./App.css";
import UploadLineUpForm from "./components/UploadLineUpForm";
import UploadPlaybookForm from "./components/UploadPlayBookForm";
import PlaybookCard from "./components/PlaybookCard/PlaybookCard";
import PlaybookDetail from "./components/PlaybookDetail";

export interface Playbook {
  agent: string;
  agent_image: string;
  map_name: string;
  playbook_name: string;
  id: number;
  map_image: string;
  minimap: string;
}

function App() {
  const backendUrl = "http://127.0.0.1:8000/";
  const testing = false;
  const [data, setData] = useState<Playbook[]>();
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

  useEffect(() => {
    getPlaybooks();
  }, []);

  return (
    <>
      <>
        {selectedPlaybook ? (
          <PlaybookDetail playbook={selectedPlaybook} returnBack={handleReturn}></PlaybookDetail>
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
