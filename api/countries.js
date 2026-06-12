const API_KEY = "rc_live_5fd9d335af0e42b29c0fb305b121579e";
const LIMIT = 100;
const TARGET = "https://api.restcountries.com";

export default async function handler(req, res) {
  try {
    const offset = req.query.offset || "0";
    const url = `${TARGET}/countries/v5?limit=${LIMIT}&api-key=${API_KEY}&offset=${offset}`;

    const response = await fetch(url);
    if (!response.ok) {
      res.status(response.status).json({ error: `API error: ${response.status}` });
      return;
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
