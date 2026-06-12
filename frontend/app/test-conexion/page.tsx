"use client";
import { useEffect, useState } from "react";
import { obtenerDashboard } from "../../services/bffService";

export default function TestConexion() {
  const [estado, setEstado] = useState("cargando");
  const [datos, setDatos] = useState<any>(null);
  const [error, setError] = useState("");
  const [bffUrl, setBffUrl] = useState("");

  useEffect(() => {
    setBffUrl(process.env.NEXT_PUBLIC_BFF_URL || "http://localhost:8080");
    obtenerDashboard()
      .then((data: any) => { setDatos(data); setEstado("ok"); })
      .catch((err: Error) => { setError(err.message); setEstado("error"); });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Test de Conexion BFF</h1>
      <p><strong>URL BFF:</strong> {bffUrl}</p>
      {estado === "cargando" && <p>Conectando al BFF...</p>}
      {estado === "ok" && (
        <div style={{ color: "green" }}>
          <p>Conexion exitosa</p>
          <p><strong>Total KPIs:</strong> {datos?.totalKpis ?? 0}</p>
          <p><strong>KPIs en meta:</strong> {datos?.kpisEnMeta ?? 0}</p>
          <pre style={{ background: "#111", color: "#0f0", padding: "1rem" }}>
            {JSON.stringify(datos, null, 2)}
          </pre>
        </div>
      )}
      {estado === "error" && (
        <div style={{ color: "red" }}>
          <p>Error: {error}</p>
          <ul>
            <li>BFF dormido en Render - espera 1 minuto y recarga</li>
            <li>Verificar variable NEXT_PUBLIC_BFF_URL en Vercel</li>
            <li>Verificar CORS en el BFF</li>
          </ul>
        </div>
      )}
    </div>
  );
}
