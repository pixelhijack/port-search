'use client';
import { useEffect, useState } from 'react';
import styles from "./page.module.css";

interface Ports {
  port_id: number;
  name: string;
  raw_names: string[];
}

interface PortsApiResponse {
  message: string;
  data: Ports[];
  [key: string]: any; // Allow additional properties if needed
}


export default function Home() {

  const [ports, setPorts] = useState<PortsApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPorts() {
      try {
        const response = await fetch('/api/ports');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setPorts(result);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchPorts(); 
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Main</h1>
          {error && <p>Error: {error}</p>}
          {ports ? (
            <pre>{JSON.stringify(ports, null, 2)}</pre>
          ) : (
            <p>Loading...</p>
          )}
      </main>
      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  );
}
