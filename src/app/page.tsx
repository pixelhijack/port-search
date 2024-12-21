'use client';
import { useEffect, useState } from 'react';
import styles from "./page.module.css";
import CheckList from './components/checklist';

interface Port {
  port_id: number;
  name: string;
  raw_names: string[];
}

interface PortsApiResponse {
  message: string;
  data: Port[];
}

interface Cruise {
  cruise_id: number;
  name: string;
  ports_of_call: number[];
}

interface CruisesApiResponse {
  message: string;
  data: Cruise[];
}


export default function Home() {

  const [ports, setPorts] = useState<Port[] | null>(null);
  const [cruises, setCruises] = useState<Cruise[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPorts, setSelectedPorts] = useState<Port[] | []>([]);
  
  // derived props
  const selectedPortIds = selectedPorts.map(port => port.port_id);
  const cruisesByPorts = selectedPorts.length > 1 ? cruises.filter(
    cruise => cruise.ports_of_call.every(id => selectedPortIds.includes(id))
  ) : cruises.filter(
    cruise => cruise.ports_of_call.some(id => selectedPortIds.includes(id))
  );

  useEffect(() => {
    async function fetchPorts() {
      try {
        const response = await fetch('/api/ports');
        if (!response.ok) {
          throw new Error('[PORTS] Network response was not ok');
        }
        const result = await response.json();
        setPorts(result.data);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchPorts(); 
  }, []);

  useEffect(() => {
    async function fetchCruises() {
      try {
        const response = await fetch('/api/cruises');
        if (!response.ok) {
          throw new Error('[CRUISES] Network response was not ok');
        }
        const result = await response.json();
        setCruises(result.data);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchCruises(); 
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Main</h1>
          <div className='row'>
            <div className='column'>
            <h2>Ports</h2>
              {ports && (
                <CheckList 
                  items={ports.map((port: Port) => port.name)} 
                  onSelect={(selectedNames) => setSelectedPorts(ports.filter(port => selectedNames.includes(port.name)))}
                />
              )}
            </div>
            <div className='column'>
              <h2>Cruises</h2>
              {cruises && (
                cruisesByPorts.map(
                  cruise => (<div key={cruise.cruise_id}>{cruise.name}</div>)
                )
              )}
            </div>
          </div>
          <hr/>
          {error && <p>Error: {error}</p>}
          {ports ? (
            <pre>{JSON.stringify(ports, null, 2)}</pre>
          ) : (
            <p>Loading ports...</p>
          )}
          <hr/>
          {cruises ? (
            <pre>{JSON.stringify(cruises, null, 2)}</pre>
          ) : (
            <p>Loading cruises...</p>
          )}
      </main>
      <footer className={styles.footer}>
        <h2>Footer</h2>
      </footer>
    </div>
  );
}
