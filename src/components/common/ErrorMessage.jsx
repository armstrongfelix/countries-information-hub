import { Box, Typography, Button } from "@mui/material";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <Box className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Typography variant="h5" color="error">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" className="dark:text-gray-300">
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
}
