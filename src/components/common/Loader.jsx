import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
  return (
    <Box className="flex justify-center items-center min-h-[50vh]">
      <CircularProgress />
    </Box>
  );
}
