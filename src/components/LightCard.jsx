// src/components/LightCard.jsx

import React from "react";

export default function LightCard({
  item,
  state,
  markTodoOk,
  markFallo,
  updateNota,
}) {
  const cardClass =
    "item-card-horizontal " +
    (state.fallo ? "item-card-error" : state.revisada ? "item-card-ok" : "");

  return (
    <div className={cardClass}>
      {/* IMAGEN */}
      {item.imagen && (
        <div className="item-image-wrapper">
          <img
            src={item.imagen}
            alt={item.name}
            className="item-image"
            loading="lazy"
          />
        </div>
      )}

      {/* CONTENIDO */}
      <div className="item-content">

        {/* TITULO */}
        <div className="item-title-block">
          <div className="item-name">{item.name}</div>
        </div>

        {/* ETIQUETAS CLARAS Y SEPARADAS */}
        <div className="item-chips">
          <span className="chip chip-cuadro">
            <strong>Ubicación:</strong> {item.cuadro}
          </span>
          <span className="chip chip-escena">
            <strong>Escena:</strong> {item.escena}
          </span>
          <span className="chip chip-horario">
            <strong>Horario:</strong> {item.horario}
          </span>
        </div>

        {/* BOTONES */}
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            className={
              "tag " + (state.revisada && !state.fallo ? "tag-ok" : "")
            }
            onClick={() => markTodoOk(item.id)}
          >
            Todo OK
          </button>

          <button
            className={"tag " + (state.fallo ? "tag-error" : "")}
            onClick={() => markFallo(item.id)}
          >
            Fallo
          </button>
        </div>

        {/* NOTA SI HAY FALLO */}
        {state.fallo && (
          <textarea
            className="item-notes"
            placeholder="Describe el fallo…"
            value={state.nota || ""}
            onChange={(e) => updateNota(item.id, e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
