const TARGET = "https://api.restcountries.com";

export default async function handler(req, res) {
  try {
    const path = (req.url || "").replace(/^\/api/, "");
    const targetUrl = `${TARGET}${path}`;

    const response = await fetch(targetUrl);

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
