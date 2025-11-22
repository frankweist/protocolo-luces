import React, { useState, useEffect } from "react";

/**
 * Versión LITE – Dashboard
 * - Botones: "Todo OK" / "Fallo"
 * - Si hay "Fallo" → aparece nota
 * - Filtros: Todos / Solo fallos / Solo pendientes
 * - Pestaña "Parte del turno" con resumen de fallos (formato informe B)
 */

const ZONES = [
  // ==================== CONSIGNA / RECEPCIÓN ====================
  {
    id: "consigna",
    name: "Consigna / Recepción hotel",
    items: [
      {
        id: "consigna-downlights-coche",
        name: "Downlights alrededor coche",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E7 (EVENTOS – activación manual)",
        horario: "Manual",
        imagen: "/images/consigna/downlights_coche.jpg",
      },
      {
        id: "consigna-dicroicas-munecas",
        name: "Dicroicas muñecas",
        cuadro: "Cuadro Office tras chupadeo",
        escena: "Permanente",
        horario: "Permanente",
        imagen: "/images/consigna/dicroicas_munecas.jpg",
      },
      {
        id: "consigna-focos-arte-pasillo",
        name: "Focos obras de arte hacia pasillo 1ª planta",
        cuadro: "Cuadro Office tras chupadeo",
        escena: "Permanente",
        horario: "Permanente",
        imagen: "/images/consigna/focos_arte.jpg",
      },
    ],
  },

  // ==================== TORRE SUR (TS) ====================
  {
    id: "torre-sur",
    name: "Torre Sur (TS)",
    items: [
      {
        id: "ts-downlights-chupadeos",
        name: "Downlights chupadeos",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E3 (LIMPIEZA)",
        horario: "06:00–08:00",
      },
      {
        id: "ts-dicroicas-chupadeos",
        name: "Dicroicas chupadeos",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E5",
        horario: "09:00–17:00 / OFF 02:00",
      },
      {
        id: "ts-mesa-austin-escalera",
        name: "Mesa Austin + Escalera (laterales)",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E7 (EVENTOS)",
        horario: "Manual",
      },
      {
        id: "ts-terraza-interior",
        name: "Terraza chupadeos (fila interior)",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E3",
        horario: "06:00–08:00",
      },
      {
        id: "ts-terraza-exterior",
        name: "Terraza chupadeos (fila exterior)",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E12",
        horario: "OCASO–02:00",
      },
      {
        id: "ts-austin-centro",
        name: "Mesa Austin + escalera (fila centro)",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E6",
        horario: "08:00–02:00",
      },
      {
        id: "ts-led-barco",
        name: "LED naranja encima barco",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "Permanente",
        horario: "Permanente",
      },
      {
        id: "ts-recepcion-mostrador",
        name: "Downlights mostrador recepción",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E7",
        horario: "Manual",
      },
      {
        id: "ts-ventas",
        name: "Lámpara corcho + ventas",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E14",
        horario: "09:00–21:00",
      },
      {
        id: "ts-escalera-barco",
        name: "Escalera barco",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E3",
        horario: "06:00–08:00",
      },
      {
        id: "ts-cartel-infinity",
        name: "Foco cartel Infinity (exterior)",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E2",
        horario: "OCASO–ORTO",
      },
      {
        id: "ts-cartel-hotel",
        name: "Cartel Hotel Higuerón",
        cuadro: "Office 1ª TS (Brinkmann)",
        escena: "E2",
        horario: "OCASO–ORTO",
      },
    ],
  },

  // ==================== TORRE NORTE (TN) ====================
  {
    id: "torre-norte",
    name: "Torre Norte (TN)",
    items: [
      {
        id: "tn-volcanes",
        name: "Escultura volcanes entrada",
        cuadro: "Office 1ª TN (Darko)",
        escena: "E12",
        horario: "OCASO–02:00",
      },
      {
        id: "tn-estrellas",
        name: "Estrella LED naranja Austin Bar",
        cuadro: "Office 1ª TN (Darko)",
        escena: "E6",
        horario: "08:00–02:00",
      },
      {
        id: "tn-banadores",
        name: "Bañadores entrada",
        cuadro: "Office 1ª TN (Darko)",
        escena: "E1/E4",
        horario: "OCASO–02:00 / 06:00–ORTO",
      },
      {
        id: "tn-led-naranja",
        name: "LED naranja volcanes",
        cuadro: "Office 1ª TN (Darko)",
        escena: "E2",
        horario: "OCASO–ORTO",
      },
    ],
  },

  // ==================== INFINITY ====================
  {
    id: "infinity",
    name: "Infinity",
    items: [
      {
        id: "inf-camas",
        name: "Camas Infinity",
        cuadro: "Cuadro cocina Infinity",
        escena: "E13/E4",
        horario: "OCASO–02:00 / 06:00–ORTO",
      },
      {
        id: "inf-escalera-evac",
        name: "Escalera evacuación",
        cuadro: "Cuadro cocina Infinity",
        escena: "E1",
        horario: "OCASO–02:00",
      },
      {
        id: "inf-salon",
        name: "Downlights salón",
        cuadro: "Cuadro cocina Infinity",
        escena: "E13/E2",
        horario: "OCASO–ORTO",
      },
      {
        id: "inf-vulcanos",
        name: "Vulcanos (foquitos pared cuadros)",
        cuadro: "Cuadro cocina Infinity",
        escena: "E13/E6",
        horario: "08:00–02:00",
      },
    ],
  },

  // ==================== SPORT ====================
  {
    id: "sport",
    name: "Sport (entrada)",
    items: [
      {
        id: "sport-escalera",
        name: "Escalera entrada",
        cuadro: "Cuadro entrada Sport",
        escena: "E8",
        horario: "OCASO–02:00 / 06:00–ORTO",
      },
      {
        id: "sport-focos-suelo",
        name: "Focos suelo entrada",
        cuadro: "Cuadro entrada Sport",
        escena: "E1",
        horario: "OCASO–02:00",
      },
      {
        id: "sport-hall",
        name: "Hall entrada (lámpara techo, foseado)",
        cuadro: "Cuadro entrada Sport",
        escena: "E8",
        horario: "OCASO–02:00 / 06:00–ORTO",
      },
    ],
  },

  // ==================== MED / COCINA PRINCIPAL ====================
  {
    id: "med",
    name: "Med / Cocina principal",
    items: [
      {
        id: "med-terraza-ext",
        name: "Terraza Med EXTERIOR (fila exterior)",
        cuadro: "Cuadro P. Cocina",
        escena: "E12/E4",
        horario: "OCASO–02:00 / 06:00–ORTO",
      },
      {
        id: "med-vuelo-int",
        name: "Vuelo exterior Med (fila interior)",
        cuadro: "Cuadro P. Cocina",
        escena: "E12/E4",
        horario: "OCASO–02:00 / 06:00–ORTO",
      },
      {
        id: "med-banadores",
        name: "Bañadores MED",
        cuadro: "Cuadro P. Cocina",
        escena: "E1/E4",
        horario: "OCASO–02:00 / 06:00–ORTO",
      },
      {
        id: "med-ascensores-arte",
        name: "Dicroicas ascensores + obras de arte",
        cuadro: "Cuadro P. Cocina",
        escena: "Permanente",
        horario: "Permanente",
      },
      {
        id: "med-refuerzo-picasso",
        name: "Pasillo hall Picasso (refuerzo)",
        cuadro: "Cuadro P. Cocina",
        escena: "E3",
        horario: "06:00–08:00",
      },
      {
        id: "med-piscina-fuente-jacuzzi",
        name: "Piscina, fuente y jacuzzi",
        cuadro: "Cuadro P. Cocina",
        escena: "E9",
        horario: "OCASO–08:00",
      },
    ],
  },

  // ==================== BUFFET ====================
  {
    id: "buffet",
    name: "Buffet",
    items: [
      {
        id: "buffet-leds-med",
        name: "LEDs salón Med",
        cuadro: "Cuadro Buffet",
        escena: "E10",
        horario: "05:00–01:00",
      },
      {
        id: "buffet-peces-led",
        name: "Peces (LED)",
        cuadro: "Cuadro Buffet",
        escena: "E6",
        horario: "08:00–02:00",
      },
      {
        id: "buffet-dicroicas-peces",
        name: "Dicroicas encima peces",
        cuadro: "Cuadro Buffet",
        escena: "E12",
        horario: "OCASO–02:00",
      },
      {
        id: "buffet-tapies-hall",
        name: "Pasillo exterior Tapies + hall",
        cuadro: "Cuadro Buffet",
        escena: "E12/E4",
        horario: "OCASO–02:00 / 06:00–ORTO",
      },
    ],
  },

  // ==================== PICASSO / HALL GYM ====================
  {
    id: "picasso",
    name: "Picasso / Hall gimnasio",
    items: [
      {
        id: "pic-terraza-ext",
        name: "Terraza Picasso (fila exterior)",
        cuadro: "Cuadro Rack Picasso",
        escena: "E12",
        horario: "OCASO–02:00",
      },
      {
        id: "pic-terraza-resto",
        name: "Terraza Picasso (resto)",
        cuadro: "Cuadro Rack Picasso / Tablet salón",
        escena: "Tablet sala",
        horario: "Según programación sala",
      },
      {
        id: "pic-ascensor",
        name: "Ascensor + dicroicas",
        cuadro: "Cuadro Rack Picasso",
        escena: "Permanente",
        horario: "Permanente",
      },
      {
        id: "pic-pasillo-gym",
        name: "Pasillo gym + LEDs hall",
        cuadro: "Cuadro Rack Picasso",
        escena: "E11",
        horario: "06:00–01:00",
      },
    ],
  },

  // ==================== PARKING AZUL ====================
  {
    id: "parking",
    name: "Parking Azul",
    items: [
      {
        id: "park-led-naranja",
        name: "LED naranja hall ascensor",
        cuadro: "Cuadro parking azul",
        escena: "E12/E6",
        horario: "OCASO–02:00 / 08:00–02:00",
      },
      {
        id: "park-pasillo-aseos",
        name: "Downlights pasillo aseos",
        cuadro: "Cuadro parking azul",
        escena: "Manual",
        horario: "Manual",
      },
      {
        id: "park-hall-ascensor",
        name: "Downlights hall ascensor",
        cuadro: "Cuadro parking azul",
        escena: "E7",
        horario: "EVENTOS (manual)",
      },
    ],
  },

  // ==================== LEIRO ====================
  {
    id: "leiro",
    name: "Torre Leiro",
    items: [
      {
        id: "leiro-atrio",
        name: "Techo atrio",
        cuadro: "Planta 0 Torre Leiro",
        escena: "Reloj",
        horario: "20:00–02:00",
      },
      {
        id: "leiro-muro",
        name: "Muro cortina",
        cuadro: "Planta 0 Torre Leiro",
        escena: "Reloj",
        horario: "20:00–02:00",
      },
      {
        id: "leiro-grafitis",
        name: "Grafitis",
        cuadro: "Planta 0 Torre Leiro",
        escena: "Reloj",
        horario: "20:00–02:00",
      },
    ],
  },

  // ==================== PISTAS / VILLAS / RESIDENCES ====================
  {
    id: "pistas",
    name: "Pistas / Residences / Villas",
    items: [
      {
        id: "pistas-padel",
        name: "Pistas pádel",
        cuadro: "Cuadros pistas pádel",
        escena: "MYHOME",
        horario: "Según recepción Sport",
      },
      {
        id: "pistas-tenis",
        name: "Pistas tenis/basket",
        cuadro: "Cuadro pista tenis",
        escena: "MYHOME",
        horario: "Según recepción Sport",
      },
      {
        id: "pistas-volley",
        name: "Pistas volley",
        cuadro: "Cuadro debajo puente",
        escena: "MYHOME",
        horario: "06:30–07:30 / 20:00–02:00",
      },
      {
        id: "villas-exteriores",
        name: "Exteriores Villas",
        cuadro: "Cuadro general Villas",
        escena: "Reloj",
        horario: "20:00–02:00 / 06:30–07:30",
      },
      {
        id: "residences-exteriores",
        name: "Exteriores apartamentos bloque B",
        cuadro: "Cuadro general apartamentos B",
        escena: "Reloj",
        horario: "20:00–02:00 / 06:30–07:30",
      },
    ],
  },
];

const STORAGE_KEY = "protocolo-luces-estado-v1";
const REPORT_KEY = "protocolo-luces-parte-final";

// Icono según tipo
function getIconForItem(name) {
  const n = name.toLowerCase();
  if (n.includes("downlight")) return "💡";
  if (n.includes("dicroica")) return "✨";
  if (n.includes("piscina") || n.includes("jacuzzi")) return "🏊";
  if (n.includes("terraza")) return "🌙";
  if (n.includes("parking")) return "🅿️";
  if (n.includes("bañadores") || n.includes("banadores")) return "🌊";
  if (n.includes("led")) return "🔌";
  if (n.includes("escultura") || n.includes("arte") || n.includes("grafiti"))
    return "🎨";
  return "🔆";
}

function App() {
  const [selectedZoneId, setSelectedZoneId] = useState(ZONES[0].id);
  const [state, setState] = useState({});
  const [filter, setFilter] = useState("all"); // all | fallos | pendientes
  const [reportExtra, setReportExtra] = useState(""); // parte libre adicional
  const [view, setView] = useState("revision"); // revision | parte

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedReport = localStorage.getItem(REPORT_KEY);
      if (saved) setState(JSON.parse(saved));
      if (savedReport) setReportExtra(savedReport);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Guardar estado luces
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }, [state]);

  // Guardar parte extra
  useEffect(() => {
    try {
      localStorage.setItem(REPORT_KEY, reportExtra);
    } catch (e) {
      console.error(e);
    }
  }, [reportExtra]);

  const selectedZone =
    ZONES.find((z) => z.id === selectedZoneId) ?? ZONES[0];

  // Lógica Todo OK / Fallo:
  // - Todo OK: revisada = true, fallo = false, nota = ""
  // - Fallo: fallo = true, revisada = true (está revisado y tiene fallo)
  const setTodoOk = (id) => {
    setState((prev) => ({
      ...prev,
      [id]: {
        revisada: true,
        fallo: false,
        nota: "",
      },
    }));
  };

  const setFallo = (id) => {
    setState((prev) => ({
      ...prev,
      [id]: {
        revisada: true,
        fallo: true,
        nota: prev[id]?.nota || "",
      },
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

  const markZoneAsReviewed = () => {
    const items = selectedZone.items;
    setState((prev) => {
      const next = { ...prev };
      items.forEach((item) => {
        const current = prev[item.id] || {};
        // Si ya tenía fallo, se mantiene fallo
        next[item.id] = {
          revisada: true,
          fallo: current.fallo || false,
          nota: current.nota || "",
        };
      });
      return next;
    });
  };

  const filterItems = (items) => {
    if (filter === "all") return items;
    if (filter === "fallos") {
      return items.filter((i) => state[i.id]?.fallo);
    }
    if (filter === "pendientes") {
      return items.filter((i) => !state[i.id]?.revisada && !state[i.id]?.fallo);
    }
    return items;
  };

  const countZoneStats = (zone) => {
    let revisadas = 0;
    let fallos = 0;
    zone.items.forEach((item) => {
      const st = state[item.id];
      if (st?.revisada || st?.fallo) revisadas++;
      if (st?.fallo) fallos++;
    });
    return { revisadas, fallos };
  };

  // Datos para el "Parte del turno" (solo fallos)
  const buildReportData = () => {
    return ZONES.map((zone) => {
      const fallos = zone.items
        .map((item) => {
          const st = state[item.id];
          if (!st?.fallo) return null;
          return {
            name: item.name,
            cuadro: item.cuadro,
            escena: item.escena,
            horario: item.horario,
            nota: st.nota || "",
          };
        })
        .filter(Boolean);
    return { zoneName: zone.name, fallos };
    }).filter((z) => z.fallos.length > 0);
  };

  const reportData = buildReportData();

  return (
    <div className="app-root">
      <div className="app-shell">
        {/* Header */}
        <header className="app-header">
          <div>
            <h1>Protocolo Luces – Turno Noche</h1>
            <p>Dashboard de revisión por zonas, con parte automático de fallos.</p>
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

        {view === "revision" ? (
          <div className="app-layout">
            {/* Sidebar zonas */}
            <aside className="app-sidebar">
              <div className="sidebar-title">Zonas</div>
              <div className="sidebar-list">
                {ZONES.map((zone) => {
                  const stats = countZoneStats(zone);
                  const active = zone.id === selectedZoneId;
                  return (
                    <button
                      key={zone.id}
                      className={
                        "sidebar-zone" +
                        (active ? " sidebar-zone-active" : "")
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

            {/* Panel principal */}
            <main className="app-main">
              {/* Controles de la zona */}
              <div className="zone-header">
                <div>
                  <div className="zone-title">{selectedZone.name}</div>
                  <div className="zone-subtitle">
                    {selectedZone.items.length} puntos de luz
                  </div>
                </div>
                <div className="zone-actions">
                  <button
                    className="btn-outline small"
                    onClick={markZoneAsReviewed}
                  >
                    Marcar zona completa revisada
                  </button>
                </div>
              </div>

              {/* Filtros */}
              <div className="filter-row">
                <span className="filter-label">Filtro:</span>
                <div className="filter-pills">
                  <button
                    className={
                      "pill" + (filter === "all" ? " pill-active" : "")
                    }
                    onClick={() => setFilter("all")}
                  >
                    Todos
                  </button>
                  <button
                    className={
                      "pill" +
                      (filter === "fallos" ? " pill-active pill-fallos" : "")
                    }
                    onClick={() => setFilter("fallos")}
                  >
                    Solo fallos
                  </button>
                  <button
                    className={
                      "pill" +
                      (filter === "pendientes"
                        ? " pill-active pill-pendientes"
                        : "")
                    }
                    onClick={() => setFilter("pendientes")}
                  >
                    Solo pendientes
                  </button>
                </div>
              </div>

              {/* Lista de luces */}
              <div className="items-list">
                {filterItems(selectedZone.items).map((item) => {
                  const st = state[item.id] || {};
                  const icon = getIconForItem(item.name);
                  return (
                    <div key={item.id} className="item-card">
                      <div className="item-header">
                        <div className="item-title-block">
                          <div className="item-icon">{icon}</div>
                          <div>
                            <div className="item-name">{item.name}</div>
                            <div className="item-meta">
                              Cuadro: {item.cuadro}
                            </div>
                            <div className="item-meta">
                              Escena: {item.escena}
                            </div>
                            <div className="item-meta">
                              Horario: {item.horario}
                            </div>
                          </div>
                        </div>
                        <div className="item-buttons">
                          <button
                            className={
                              "tag" +
                              (st.revisada && !st.fallo ? " tag-ok" : " tag-muted")
                            }
                            onClick={() => setTodoOk(item.id)}
                          >
                            Todo OK
                          </button>
                          <button
                            className={
                              "tag" +
                              (st.fallo ? " tag-error" : " tag-muted")
                            }
                            onClick={() => setFallo(item.id)}
                          >
                            Fallo
                          </button>
                        </div>
                      </div>

                      {/* Nota solo si hay fallo */}
                      {st.fallo && (
                        <textarea
                          className="item-notes"
                          rows={2}
                          value={st.nota || ""}
                          onChange={(e) =>
                            updateNota(item.id, e.target.value)
                          }
                          placeholder="Describe el fallo…"
                        />
                      )}
                    </div>
                  );
                })}

                {filterItems(selectedZone.items).length === 0 && (
                  <div className="empty-message">
                    No hay elementos con el filtro seleccionado.
                  </div>
                )}
              </div>
            </main>
          </div>
        ) : (
          /* Vista PARTE DEL TURNO */
          <div className="parte-layout">
            <div className="parte-panel">
              <div className="parte-title">
                Parte de trabajo – Turno noche
              </div>
              <div className="parte-date">
                Fecha: {new Date().toLocaleString()}
              </div>

              {reportData.length === 0 && (
                <div className="parte-empty">
                  No hay fallos registrados en este turno.
                </div>
              )}

              {reportData.length > 0 && (
                <div className="parte-content">
                  {reportData.map((zone) => (
                    <div key={zone.zoneName} className="parte-zone-block">
                      <div className="parte-zone-header">
                        [{zone.zoneName}]
                      </div>
                      {zone.fallos.map((f, idx) => (
                        <div key={idx} className="parte-item">
                          <div className="parte-item-title">
                            • {f.name}
                          </div>
                          <div className="parte-item-meta">
                            Cuadro: {f.cuadro} · Escena: {f.escena} · Horario:{" "}
                            {f.horario}
                          </div>
                          {f.nota && f.nota.trim() !== "" && (
                            <div className="parte-item-nota">
                              Nota: {f.nota}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              <div className="parte-extra">
                <div className="parte-extra-title">
                  Observaciones generales / instrucciones para el siguiente turno
                </div>
                <textarea
                  className="parte-extra-textarea"
                  rows={4}
                  value={reportExtra}
                  onChange={(e) => setReportExtra(e.target.value)}
                  placeholder="Aquí puedes añadir un resumen general, instrucciones para el siguiente turno, incidencias no ligadas a un punto de luz concreto…"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
