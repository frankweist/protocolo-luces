// src/components/LightCard.jsx

import React from "react";

// Icono automático según el tipo de luz
function getIconForItem(name) {
  const n = name.toLowerCase();
  if (n.includes("downlight")) return "💡";
  if (n.includes("dicroica")) return "✨";
  if (n.includes("led")) return "🔌";
  if (n.includes("terraza")) return "🌙";
  if (n.includes("piscina") || n.includes("jacuzzi")) return "🏊";
  if (n.includes("escalera")) return "🪜";
  if (n.includes("parking")) return "🅿️";
  if (n.includes("banadores") || n.includes("bañadores")) return "🌊";
  if (n.includes("arte") || n.includes("obra")) return "🎨";
  return "🔆";
}

export default function LightCard({
  item,
  state,
  markTodoOk,
  markFallo,
  updateNota,
}) {
  const icon = getIconForItem(item.name);

  const st = {
    revisada: state.revisada || false,
    fallo: state.fallo || false,
    nota: state.nota || "",
  };

  return (
    <div className="item-card">
      {/* Imagen del punto de luz */}
      {item.imagen && (
        <img
          src={item.imagen}
          alt={item.name}
          className="item-image"
        />
      )}

      {/* Cabecera del item */}
      <div className="item-header">
        <div className="item-title-block">
          <div className="item-icon">{icon}</div>

          <div>
            <div className="item-name">{item.name}</div>

            <div className="item-meta">
              <strong>Cuadro:</strong> {item.cuadro}
            </div>

            <div className="item-meta">
              <strong>Escena:</strong> {item.escena}
            </div>

            <div className="item-meta">
              <strong>Horario:</strong> {item.horario}
            </div>
          </div>
        </div>

        {/* Botones de estado */}
        <div className="item-buttons">

          {/* Todo OK */}
          <button
            className={
              "tag" + (st.revisada && !st.fallo ? " tag-ok" : " tag-muted")
            }
            onClick={() => markTodoOk(item.id)}
          >
            Todo OK
          </button>

          {/* Fallo */}
          <button
            className={
              "tag" + (st.fallo ? " tag-error" : " tag-muted")
            }
            onClick={() => markFallo(item.id)}
          >
            Fallo
          </button>

        </div>
      </div>

      {/* Campo de nota si hay fallo */}
      {st.fallo && (
        <textarea
          className="item-notes"
          rows={2}
          value={st.nota}
          onChange={(e) => updateNota(item.id, e.target.value)}
          placeholder="Describe el fallo…"
        />
      )}
    </div>
  );
}
