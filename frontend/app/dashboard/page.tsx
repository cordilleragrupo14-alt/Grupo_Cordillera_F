"use client";
import { useEffect, useState } from "react";
import { obtenerDashboard } from "../../services/bffService";

interface KpiDTO {
  id: string;
  nombre: string;
  area: string;
  meta: number;
  valorActual: number;
  porcentajeCumplimiento: number;
  estado: "EN_META" | "EN_PROGRESO" | "EN_RIESGO" | "CRITICO";
  unidad?: string;
}

interface DashboardDTO {
  kpis: KpiDTO[];
  kpisPorEstado: Record<string, number>;
  ventasPorArea: Record<string, number>;
  totalKpis: number;
  kpisEnMeta: number;
  generadoEn: string;
}

const ESTADO_COLOR: Record<string, string> = {
  EN_META:     "#16a34a",
  EN_PROGRESO: "#ca8a04",
  EN_RIESGO:   "#ea580c",
  CRITICO:     "#dc2626",
};

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardDTO | null>(null);
  const [cargando, setCargando]   = useState(true);
  const [error, setError]         = useState("");

  useEffect(() => {
    obtenerDashboard()
      .then((data: DashboardDTO) => { setDashboard(data); setCargando(false); })
      .catch((err: Error)        => { setError(err.message); setCargando(false); });
  }, []);

  if (cargando) return <div style={{ padding: "2rem" }}>Cargando dashboard...</div>;
  if (error)    return (
    <div style={{ padding: "2rem", color: "red" }}>
      <strong>Error al conectar con el BFF:</strong> {error}
      <p style={{ color: "#555" }}>Si el servicio en Render está dormido, espera 1 minuto y recarga.</p>
    </div>
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.25rem" }}>Dashboard — Grupo Cordillera</h1>
      {dashboard?.generadoEn && (
        <p style={{ color: "#888", fontSize: "0.85rem", marginTop: 0 }}>
          Actualizado: {new Date(dashboard.generadoEn).toLocaleString("es-CL")}
        </p>
      )}

      {/* Tarjetas resumen */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <Tarjeta titulo="Total KPIs"   valor={dashboard?.totalKpis ?? 0}   color="#1e40af" />
        <Tarjeta titulo="KPIs en Meta" valor={dashboard?.kpisEnMeta ?? 0}   color="#16a34a" />
        {dashboard?.kpisPorEstado && Object.entries(dashboard.kpisPorEstado).map(([estado, count]) => (
          <Tarjeta key={estado} titulo={estado} valor={count} color={ESTADO_COLOR[estado] ?? "#6b7280"} />
        ))}
      </div>

      {/* Ventas por área */}
      {dashboard?.ventasPorArea && Object.keys(dashboard.ventasPorArea).length > 0 && (
        <>
          <h2>Datos por Área</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {Object.entries(dashboard.ventasPorArea).map(([area, total]) => (
              <div key={area} style={{ background: "#f1f5f9", padding: "1rem", borderRadius: "8px", minWidth: "160px" }}>
                <strong>{area}</strong>
                <p style={{ fontSize: "1.25rem", margin: "0.25rem 0 0" }}>
                  {total.toLocaleString("es-CL")}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Tabla KPIs */}
      <h2>KPIs del Sistema</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              {["Nombre", "Área", "Meta", "Actual", "% Cumplimiento", "Estado"].map(h => (
                <th key={h} style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #e2e8f0" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(dashboard?.kpis ?? []).length > 0 ? (
              dashboard!.kpis.map((kpi) => (
                <tr key={kpi.id}>
                  <td style={{ padding: "0.75rem", border: "1px solid #e2e8f0" }}>{kpi.nombre}</td>
                  <td style={{ padding: "0.75rem", border: "1px solid #e2e8f0" }}>{kpi.area}</td>
                  <td style={{ padding: "0.75rem", border: "1px solid #e2e8f0" }}>{kpi.meta?.toLocaleString("es-CL")} {kpi.unidad}</td>
                  <td style={{ padding: "0.75rem", border: "1px solid #e2e8f0" }}>{kpi.valorActual?.toLocaleString("es-CL")} {kpi.unidad}</td>
                  <td style={{ padding: "0.75rem", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ flex: 1, background: "#e2e8f0", borderRadius: "4px", height: "8px" }}>
                        <div style={{
                          width: `${Math.min(kpi.porcentajeCumplimiento ?? 0, 100)}%`,
                          background: ESTADO_COLOR[kpi.estado] ?? "#6b7280",
                          borderRadius: "4px", height: "8px"
                        }} />
                      </div>
                      <span>{kpi.porcentajeCumplimiento ?? 0}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem", border: "1px solid #e2e8f0",
                    color: ESTADO_COLOR[kpi.estado] ?? "#374151", fontWeight: "bold" }}>
                    {kpi.estado}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ padding: "1.5rem", textAlign: "center", color: "#888" }}>
                  No hay KPIs registrados aún
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tarjeta({ titulo, valor, color }: { titulo: string; valor: number; color: string }) {
  return (
    <div style={{ background: color, color: "white", padding: "1.5rem", borderRadius: "8px", minWidth: "140px" }}>
      <h3 style={{ margin: "0 0 0.5rem", fontSize: "0.9rem" }}>{titulo}</h3>
      <p style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>{valor}</p>
    </div>
  );
}
