import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url, platform } = req.query;
  if (!url || !platform) return res.status(400).json({ error: 'Missing parameters' });

  try {
    const apiRes = await fetch(`https://multimedia.tiiny.io?${platform}=${encodeURIComponent(url)}`);
    if (!apiRes.ok) throw new Error('Failed to fetch API');
    const data = await apiRes.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
