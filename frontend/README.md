# Frontend — Grupo Cordillera
Plataforma de monitoreo inteligente para Grupo Cordillera. Desarrollada con Next.js 15.

## Variables de entorno
Crear archivo `.env.local` en la raíz:
```
NEXT_PUBLIC_BFF_URL=https://grupo-cordillera-bff.onrender.com
```

En Vercel, agregar en Settings → Environment Variables:
```
NEXT_PUBLIC_BFF_URL = https://grupo-cordillera-bff.onrender.com
```

## Páginas disponibles
| Ruta | Descripción |
|------|-------------|
| `/` | Página principal |
| `/dashboard` | Dashboard de KPIs y datos organizacionales |
| `/test-conexion` | Prueba de conexión al BFF |

## Instalación y ejecución local
```bash
npm install
npm run dev
```

## Despliegue
Conectar repositorio a Vercel. Cada push a `main` despliega automáticamente.
