// src/components/ZonePanel.jsx

import React from "react";
import LightCard from "./LightCard";
import Filters from "./Filters";

export default function ZonePanel({
  zone,
  state,
  filter,
  setFilter,
  markTodoOk,
  markFallo,
  updateNota,
  markZoneReviewed,
}) {
  if (!zone) return null;

  const filterItems = (items) => {
    if (filter === "all") return items;
    if (filter === "fallos") return items.filter((i) => state[i.id]?.fallo);
    if (filter === "pendientes")
      return items.filter((i) => !state[i.id]?.revisada && !state[i.id]?.fallo);
    return items;
  };

  const items = filterItems(zone.items);

  return (
    <main className="app-main">
      {/* Header de zona */}
      <div className="zone-header">
        <div>
          <div className="zone-title">{zone.name}</div>
          <div className="zone-subtitle">{zone.items.length} puntos de luz</div>
        </div>

        <div className="zone-actions">
          <button className="btn-outline small" onClick={markZoneReviewed}>
            Marcar zona completa revisada
          </button>
        </div>
      </div>

      {/* Filtros */}
      <Filters filter={filter} setFilter={setFilter} />

      {/* Lista de tarjetas */}
      <div className="items-list">
        {items.length === 0 ? (
          <div className="empty-message">
            No hay elementos para este filtro.
          </div>
        ) : (
          items.map((item) => (
            <LightCard
              key={item.id}
              item={item}
              state={state[item.id] || {}}
              markTodoOk={markTodoOk}
              markFallo={markFallo}
              updateNota={updateNota}
            />
          ))
        )}
      </div>
    </main>
  );
}
