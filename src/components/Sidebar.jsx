// src/components/Sidebar.jsx

import React from "react";

export default function Sidebar({
  zones,
  selectedZoneId,
  setSelectedZoneId,
  state,
}) {
  const zoneStateSummary = (zone) => {
    const items = zone.items;
    const revisadas = items.filter((i) => state[i.id]?.revisada).length;
    const fallos = items.filter((i) => state[i.id]?.fallo).length;

    return { revisadas, fallos };
  };

  return (
    <aside className="app-sidebar">
      <div className="sidebar-title">Zonas</div>

      <div className="sidebar-list">
        {zones.map((zone) => {
          const { revisadas, fallos } = zoneStateSummary(zone);

          return (
            <div
              key={zone.id}
              className={
                "sidebar-zone " +
                (selectedZoneId === zone.id ? "sidebar-zone-active" : "")
              }
              onClick={() => setSelectedZoneId(zone.id)}
            >
              <div className="sidebar-zone-name">{zone.name}</div>
              <div className="sidebar-zone-meta">
                {revisadas}/{zone.items.length} revisadas ·{" "}
                {fallos > 0 ? `${fallos} fallos` : "0 fallos"}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
