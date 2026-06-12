import { Component } from "react";
import { Box, Typography, Button } from "@mui/material";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50 dark:bg-gray-900 p-8">
          <Typography variant="h4" color="error">
            Something went wrong
          </Typography>
          <Typography variant="body1" className="dark:text-gray-300 max-w-lg text-center">
            {this.state.error?.message || "An unexpected error occurred"}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = "/";
            }}
          >
            Reload App
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
