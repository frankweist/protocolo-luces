// src/components/Sidebar.jsx

import React from "react";

export default function Sidebar({
  zones,
  selectedZoneId,
  setSelectedZoneId,
  state,
}) {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-title">Zonas</div>

      <div className="sidebar-list">
        {zones.map((z) => {
          const revisadas = z.items.filter((i) => state[i.id]?.revisada).length;
          const total = z.items.length;

          const isActive = z.id === selectedZoneId;

          return (
            <div
              key={z.id}
              className={`sidebar-zone ${isActive ? "sidebar-zone-active" : ""}`}
              onClick={() => setSelectedZoneId(z.id)}
            >
              <div className="sidebar-zone-name">
                {z.name}
                <span
                  style={{
                    float: "right",
                    opacity: 0.5,
                    fontSize: "14px",
                    marginTop: "2px",
                  }}
                >
                  ▼
                </span>
              </div>

              <div className="sidebar-zone-meta">
                {revisadas}/{total} revisados
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
