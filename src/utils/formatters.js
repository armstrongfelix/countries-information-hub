export function formatPopulation(num) {
  if (!num) return "N/A";
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

export function formatArea(area) {
  if (!area) return "N/A";
  return `${area.kilometers?.toLocaleString() ?? "N/A"} km²`;
}

export function formatCurrencies(currencies) {
  if (!currencies?.length) return "N/A";
  return currencies.map((c) => `${c.name} (${c.symbol})`).join(", ");
}

export function formatLanguages(languages) {
  if (!languages?.length) return "N/A";
  return languages.map((l) => l.name).join(", ");
}
