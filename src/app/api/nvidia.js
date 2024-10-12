// pages/api/nvidia.js

export default async function handler(req, res) {
    const API_KEY = "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";
    const invokeUrl = 'https://health.api.nvidia.com/v1/biology/nvidia/molmim/generate';
  
    if (req.method === 'POST') {
      try {
        const response = await fetch(invokeUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
  
        const data = await response.json();
        res.status(response.status).json(data);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data from NVIDIA API' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  