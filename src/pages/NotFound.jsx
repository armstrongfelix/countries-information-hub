import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <Box className="flex flex-col items-center justify-center min-h-[70vh] gap-4 dark:bg-gray-900">
      <Typography variant="h2" className="font-bold text-gray-400">
        404
      </Typography>
      <Typography variant="h5" className="dark:text-gray-200">
        Page Not Found
      </Typography>
      <Typography variant="body1" className="dark:text-gray-400 mb-4">
        The page you are looking for does not exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        startIcon={<FaHome />}
      >
        Back to Home
      </Button>
    </Box>
  );
}
