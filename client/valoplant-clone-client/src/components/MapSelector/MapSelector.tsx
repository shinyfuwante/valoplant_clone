import React from 'react'
import { ValMap } from '../../App'
//import './MapSelector.css'

export default function MapSelector({availableMaps, setMap}:{availableMaps:ValMap[], setMap:((arg0: ValMap)=>void)}) {
    const rankedMaps = ["Breeze", "Lotus", "Pearl", "Icebox", "Haven", "Ascent", "Split", "Fracture", "Bind"];
    
  return (
    <div className="map-selector">
    {availableMaps.map((val_map) => {
        if (!rankedMaps.includes(val_map.display_name)) {
            return <></>;
        }
       return <button className="map-selector-button" onClick={() => setMap(val_map)}>
          <img className="map-selector-image" src={val_map.display_icon}></img>
          <span className="map-selector-name">{val_map.display_name}</span>
        </button>})}
    </div>
  )
}
