import { TextField, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search countries..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch className="text-gray-400 dark:text-gray-500" />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "var(--input-bg, #fff)",
          "& fieldset": { borderColor: "var(--border-color, #ccc)" },
        },
      }}
    />
  );
}
