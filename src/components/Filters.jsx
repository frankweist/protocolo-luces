// src/components/Filters.jsx

import React from "react";

export default function Filters({ filter, setFilter }) {
  return (
    <div className="filter-row">
      <span className="filter-label">Filtro:</span>

      <div className="filter-pills">
        {/* Todos */}
        <button
          className={"pill" + (filter === "all" ? " pill-active" : "")}
          onClick={() => setFilter("all")}
        >
          Todos
        </button>

        {/* Solo fallos */}
        <button
          className={
            "pill" + (filter === "fallos" ? " pill-active pill-fallos" : "")
          }
          onClick={() => setFilter("fallos")}
        >
          Fallos
        </button>

        {/* Solo pendientes */}
        <button
          className={
            "pill" +
            (filter === "pendientes" ? " pill-active pill-pendientes" : "")
          }
          onClick={() => setFilter("pendientes")}
        >
          Pendientes
        </button>
      </div>
    </div>
  );
}
