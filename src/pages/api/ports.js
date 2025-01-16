import ports from '../../../mock/ports.json';
import port_mappings from '../../../mock/port_mappings.json';

const getPortLang = (locale, portName) => {
  const localisedName = port_mappings.find(port => portName === port.canonical);
  return localisedName?.[locale] || portName;
}

// pages/api/ports.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    const locale = req.query.locale || 'en';
    res.status(200).json({ message: 'Ports endpoint', data: ports.map(port => ({ 
      ...port, 
      name: getPortLang(locale, port.name) 
    })) });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}