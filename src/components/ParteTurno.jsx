// src/components/ParteTurno.jsx

import React from "react";

export default function ParteTurno({
  reportData,
  reportExtra,
  setReportExtra,
}) {
  return (
    <div className="parte-layout">
      <div className="parte-panel">
        <div className="parte-title">Parte de trabajo – Turno noche</div>

        <div className="parte-date">
          Fecha: {new Date().toLocaleString()}
        </div>

        {/* Si no hay fallos */}
        {reportData.length === 0 && (
          <div className="parte-empty">
            No hay fallos registrados en este turno.
          </div>
        )}

        {/* Fallos agrupados por zonas */}
        {reportData.length > 0 && (
          <div className="parte-content">
            {reportData.map((zone) => (
              <div key={zone.zoneName} className="parte-zone-block">
                <div className="parte-zone-header">[{zone.zoneName}]</div>

                {zone.fallos.map((f, idx) => (
                  <div key={idx} className="parte-item">
                    <div className="parte-item-title">• {f.name}</div>

                    <div className="parte-item-meta">
                      Cuadro: {f.cuadro} · Escena: {f.escena} · Horario: {f.horario}
                    </div>

                    {f.nota && f.nota.trim() !== "" && (
                      <div className="parte-item-nota">Nota: {f.nota}</div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Observaciones del turno */}
        <div className="parte-extra">
          <div className="parte-extra-title">
            Observaciones generales / instrucciones para el siguiente turno
          </div>

          <textarea
            className="parte-extra-textarea"
            rows={4}
            value={reportExtra}
            onChange={(e) => setReportExtra(e.target.value)}
            placeholder="Escribe aquí el resumen general del turno, incidencias adicionales o tareas para el siguiente turno…"
          />
        </div>
      </div>
    </div>
  );
}
