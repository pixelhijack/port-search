import ports from '../../../mock/ports.json';

// pages/api/ports.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({ message: 'Ports endpoint', data: ports });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }