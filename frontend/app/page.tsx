import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f5f5f5',
      color: '#333'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Bienvenido a Grupo Cordillera
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>
        El sistema está en línea. Selecciona una opción para continuar:
      </p>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link 
          href="/dashboard" 
          style={{
            padding: '12px 24px',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          Ir al Dashboard
        </Link>

        <Link 
          href="/test-conexion" 
          style={{
            padding: '12px 24px',
            backgroundColor: '#10b981',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          Probar Conexión
        </Link>
      </div>
    </main>
  );
}