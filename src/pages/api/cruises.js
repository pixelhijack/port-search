import cruises from '../../../mock/cruises.json';

// pages/api/cruises.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({ message: 'Cruises endpoint', data: cruises });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }