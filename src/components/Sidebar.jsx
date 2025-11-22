// src/components/Sidebar.jsx

import React from "react";

export default function Sidebar({
  zones,
  selectedZoneId,
  setSelectedZoneId,
  state,
}) {
  const countStats = (zone) => {
    let revisadas = 0;
    let fallos = 0;

    zone.items.forEach((item) => {
      const st = state[item.id];
      if (st?.revisada || st?.fallo) revisadas++;
      if (st?.fallo) fallos++;
    });

    return { revisadas, fallos };
  };

  return (
    <aside className="app-sidebar">
      <div className="sidebar-title">Zonas</div>

      <div className="sidebar-list">
        {zones.map((zone) => {
          const stats = countStats(zone);
          const active = zone.id === selectedZoneId;

          return (
            <button
              key={zone.id}
              className={
                "sidebar-zone" + (active ? " sidebar-zone-active" : "")
              }
              onClick={() => setSelectedZoneId(zone.id)}
            >
              <div className="sidebar-zone-name">{zone.name}</div>

              <div className="sidebar-zone-meta">
                {stats.revisadas}/{zone.items.length} revisadas ·{" "}
                {stats.fallos} fallos
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
