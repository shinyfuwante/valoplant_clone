import React from 'react'

export default function Playbooks({data}) {
    const maps_map = new Map();
    const agents_map = new Map();
    const val_api_url_agents = 'http://127.0.0.1:8000/fetch_agents_from_val_api'
    const getAgentData = async () => {
        const res = await fetch(val_api_url_agents);
        return await res.json();
    }
  return (
    <div>Playbooks</div>
  )
}
