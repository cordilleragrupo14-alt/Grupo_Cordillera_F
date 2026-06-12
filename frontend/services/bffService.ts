// services/bffService.ts
const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:8080';

export async function obtenerKpis() {
  const res = await fetch(`${BFF_URL}/api/bff/kpis`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener KPIs');
  return res.json();
}

export async function obtenerKpisPorArea(area: string) {
  const res = await fetch(`${BFF_URL}/api/bff/kpis/area/${area}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error al obtener KPIs del área ${area}`);
  return res.json();
}

export async function obtenerDatos() {
  const res = await fetch(`${BFF_URL}/api/bff/datos`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener datos organizacionales');
  return res.json();
}

export async function obtenerDatosPorArea(area: string) {
  const res = await fetch(`${BFF_URL}/api/bff/datos/area/${area}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error al obtener datos del área ${area}`);
  return res.json();
}

export async function obtenerDashboard() {
  const res = await fetch(`${BFF_URL}/api/bff/dashboard`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener dashboard');
  return res.json();
}
