import { useEffect } from "react";
import { useCountryStore } from "../store/useCountryStore";
import CountryCard from "../components/common/CountryCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { Box, Typography } from "@mui/material";

export default function Favorites() {
  const {
    countries,
    favorites,
    isLoading,
    error,
    fetchCountries,
    toggleFavorite,
  } = useCountryStore();

  useEffect(() => {
    if (countries.length === 0 && !isLoading && !error) {
      fetchCountries();
    }
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCountries} />;

  const favoriteCountries = countries.filter((c) =>
    favorites.includes(c.codes.alpha_3)
  );

  return (
    <Box className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Typography variant="h4" className="font-bold mb-6 dark:text-white">
          Your Favorites
        </Typography>

        {favoriteCountries.length === 0 ? (
          <Typography className="text-center mt-12 dark:text-gray-300">
            No favorite countries yet. Browse and add some!
          </Typography>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteCountries.map((country) => (
              <CountryCard
                key={country.codes.alpha_3}
                country={country}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </Box>
  );
}
