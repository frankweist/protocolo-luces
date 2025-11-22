// src/components/Header.jsx

import React from "react";

export default function Header({ view, setView }) {
  return (
    <header className="app-header">
      <div>
        <h1>Protocolo Luces – Turno Noche</h1>
        <p>Revisión por zonas + Parte automática de incidencias</p>
      </div>

      <div className="view-tabs">
        <button
          className={
            "view-tab" + (view === "revision" ? " view-tab-active" : "")
          }
          onClick={() => setView("revision")}
        >
          Revisión por zonas
        </button>

        <button
          className={
            "view-tab" + (view === "parte" ? " view-tab-active" : "")
          }
          onClick={() => setView("parte")}
        >
          Parte del turno
        </button>
      </div>
    </header>
  );
}
