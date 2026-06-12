import { useEffect, useState, useMemo } from "react";
import { useCountryStore } from "../store/useCountryStore";
import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "../components/common/SearchBar";
import RegionFilter from "../components/common/RegionFilter";
import CountryCard from "../components/common/CountryCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import Pagination from "../components/common/Pagination";
import { Box, Typography } from "@mui/material";

const ITEMS_PER_PAGE = 24;

export default function Home() {
  const {
    countries,
    isLoading,
    error,
    searchQuery,
    selectedRegion,
    favorites,
    fetchCountries,
    setSearchQuery,
    setSelectedRegion,
    toggleFavorite,
  } = useCountryStore();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(localSearch, 400);

  useEffect(() => {
    if (countries.length === 0 && !isLoading && !error) {
      fetchCountries();
    }
  }, []);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
    setPage(1);
  }, [debouncedSearch, setSearchQuery]);

  useEffect(() => {
    setPage(1);
  }, [selectedRegion]);

  const filtered = useMemo(() => {
    const store = useCountryStore.getState();
    return store.getFilteredCountries();
  }, [countries, searchQuery, selectedRegion]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCountries} />;

  return (
    <Box className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Typography variant="h4" className="font-bold mb-6 dark:text-white">
          Countries Dashboard
        </Typography>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar value={localSearch} onChange={setLocalSearch} />
          </div>
          <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
        </div>

        {filtered.length === 0 ? (
          <Typography className="text-center mt-12 dark:text-gray-300">
            No countries found.
          </Typography>
        ) : (
          <>
            <Typography variant="body2" className="mb-4 dark:text-gray-400">
              Showing {paginated.length} of {filtered.length} countries
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginated.map((country) => (
                <CountryCard
                  key={country.codes.alpha_3}
                  country={country}
                  isFavorite={favorites.includes(country.codes.alpha_3)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            <Pagination
              count={totalPages}
              page={page}
              onChange={setPage}
            />
          </>
        )}
      </div>
    </Box>
  );
}
