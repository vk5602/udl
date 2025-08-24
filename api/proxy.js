// api/proxy.js (Vercel serverless function with proper headers & error handling)
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url, platform } = req.query;
  if (!url || !platform) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const apiRes = await fetch(`https://multimedia.tiiny.io?${platform}=${encodeURIComponent(url)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json'
      },
    });

    if (!apiRes.ok) throw new Error(`API fetch failed: ${apiRes.status}`);

    const data = await apiRes.json();
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow frontend
    res.status(200).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: err.message });
  }
}
