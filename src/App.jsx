// src/App.jsx

import React, { useState, useEffect } from "react";
import { ZONES } from "./data/zones";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ZonePanel from "./components/ZonePanel";
import ParteTurno from "./components/ParteTurno";

import "./index.css";

const STORAGE_KEY = "protocolo-luces-estado-v1";
const REPORT_KEY = "protocolo-luces-parte-final";

function App() {
  const [state, setState] = useState({});
  const [reportExtra, setReportExtra] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState(ZONES[0].id);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("revision"); // revision | parte

  // Load
  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      const r = localStorage.getItem(REPORT_KEY);
      if (s) setState(JSON.parse(s));
      if (r) setReportExtra(r);
    } catch (e) {}
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }, [state]);

  // Save report
  useEffect(() => {
    try {
      localStorage.setItem(REPORT_KEY, reportExtra);
    } catch (e) {}
  }, [reportExtra]);

  const selectedZone = ZONES.find((z) => z.id === selectedZoneId);

  const markTodoOk = (id) => {
    setState((prev) => ({
      ...prev,
      [id]: { revisada: true, fallo: false, nota: "" },
    }));
  };

  const markFallo = (id) => {
    setState((prev) => ({
      ...prev,
      [id]: { revisada: true, fallo: true, nota: prev[id]?.nota || "" },
    }));
  };

  const updateNota = (id, nota) => {
    setState((prev) => ({
      ...prev,
      [id]: {
        revisada: prev[id]?.revisada || false,
        fallo: prev[id]?.fallo || false,
        nota,
      },
    }));
  };

  const markZoneReviewed = () => {
    setState((prev) => {
      const next = { ...prev };
      selectedZone.items.forEach((item) => {
        const st = prev[item.id] || {};
        next[item.id] = {
          revisada: true,
          fallo: st.fallo || false,
          nota: st.nota || "",
        };
      });
      return next;
    });
  };

  const reportData = ZONES.map((zone) => ({
    zoneName: zone.name,
    fallos: zone.items
      .filter((i) => state[i.id]?.fallo)
      .map((i) => ({
        name: i.name,
        cuadro: i.cuadro,
        escena: i.escena,
        horario: i.horario,
        nota: state[i.id]?.nota || "",
      })),
  })).filter((z) => z.fallos.length > 0);

  return (
    <div className="app-root">
      <div className="app-shell">
        <Header view={view} setView={setView} />

        {view === "revision" ? (
          <div className="app-layout">
            <Sidebar
              zones={ZONES}
              selectedZoneId={selectedZoneId}
              setSelectedZoneId={setSelectedZoneId}
              state={state}
            />

            <ZonePanel
              zone={selectedZone}
              state={state}
              filter={filter}
              setFilter={setFilter}
              markTodoOk={markTodoOk}
              markFallo={markFallo}
              updateNota={updateNota}
              markZoneReviewed={markZoneReviewed}
            />
          </div>
        ) : (
          <ParteTurno
            reportData={reportData}
            reportExtra={reportExtra}
            setReportExtra={setReportExtra}
          />
        )}
      </div>
    </div>
  );
}

export default App;
