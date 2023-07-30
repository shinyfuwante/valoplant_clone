import React from 'react'
import { Agent } from '../../App'
import './AgentSelector.css'

export default function AgentSelector({availableAgents, setAgent}:{availableAgents:Agent[], setAgent:((arg0: Agent)=>void)}) {
  return (
    <div className="agent-selector">
    {availableAgents.map((val_agent) => {
       return <button className="agent-selector-button" onClick={() => setAgent(val_agent)}>
          <img className="agent-selector-image" src={val_agent.display_icon}></img>
          <span className="agent-selector-name">{val_agent.display_name}</span>
        </button>})}
    </div>
  )
}
