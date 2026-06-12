import MuiPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Pagination({ count, page, onChange }) {
  if (count <= 1) return null;

  return (
    <Stack spacing={2} alignItems="center" className="my-6">
      <MuiPagination
        count={count}
        page={page}
        onChange={(_, p) => onChange(p)}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
