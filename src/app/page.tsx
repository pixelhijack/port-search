'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

  /* STATE */
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [ports, setPorts] = useState<Port[] | []>([]);
  const [cruises, setCruises] = useState<Cruise[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPorts, setSelectedPorts] = useState<Port[] | []>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [selectedCruise, setSelectedCruise] = useState<Cruise | null>(null);
  const selectedCruiseId = searchParams && searchParams.get('cruise') as string | undefined;
  
  /* DERIVED PROPS */
  const selectedPortIds = selectedPorts.map(port => port.port_id);
  // one port selected: lists all cruise occurences with that port,
  // two/multiple ports selected: narrow down to only show that contains both
  const cruisesByPorts = selectedPorts.length > 1 ? cruises.filter(
    cruise => cruise.ports_of_call.every(id => selectedPortIds.includes(id))
  ) : cruises.filter(
    cruise => cruise.ports_of_call.some(id => selectedPortIds.includes(id))
  );
  // ports by search term
  const filteredPorts = searchTerm ? ports.filter(
    port => port.raw_names.some(
      rawName => rawName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) : ports;

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

  const handleSelectCruise = (cruiseId: number) => {
    router.push({ pathname: '/', query: { cruise: cruiseId } }, undefined, { shallow: true });
  };

  console.log(ports, cruises);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Port name search</h1>
        <input
          type="text"
          placeholder="Search ports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
          <div className='row'>
            <div className='column'>
            <h2>Ports</h2>
              {ports && (
                <CheckList 
                  items={filteredPorts.map((port: Port) => port.name)} 
                  onSelect={(selectedNames) => setSelectedPorts(ports.filter(port => selectedNames.includes(port.name)))}
                />
              )}
            </div>
            <div className='column'>
              <h2>Cruises</h2>
              {cruises && (
                cruisesByPorts.map(
                  cruise => (
                    <div className='cruises' key={cruise.cruise_id} onClick={() => handleSelectCruise(cruise.cruise_id)}>{cruise.name}</div>
                  )
                )
              )}
            </div>
          </div>
          <hr/>
          {error && <p>Error: {error}</p>}
      </main>
    </div>
  );
}
