import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function RegionFilter({ value, onChange }) {
  return (
    <FormControl sx={{ minWidth: 160 }}>
      <InputLabel id="region-label">Region</InputLabel>
      <Select
        labelId="region-label"
        value={value}
        label="Region"
        onChange={(e) => onChange(e.target.value)}
      >
        {REGIONS.map((r) => (
          <MenuItem key={r} value={r === "All" ? "" : r}>
            {r}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
