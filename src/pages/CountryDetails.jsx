import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCountryStore } from "../store/useCountryStore";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import NotFound from "./NotFound";
import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
} from "@mui/material";
import { formatPopulation, formatArea, formatCurrencies, formatLanguages } from "../utils/formatters";
import { FaArrowLeft } from "react-icons/fa";

export default function CountryDetails() {
  const { code } = useParams();
  const { countries, isLoading, error, fetchCountries } = useCountryStore();

  useEffect(() => {
    if (countries.length === 0 && !isLoading && !error) {
      fetchCountries();
    }
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCountries} />;

  const country = countries.find((c) => c.codes.alpha_3 === code);

  if (!country) return <NotFound />;

  const nativeNames = Object.values(country.names.native || {}).map((n) => n.common);
  const borders = country.borders
    ?.map((alpha3) => countries.find((c) => c.codes.alpha_3 === alpha3))
    .filter(Boolean) || [];

  return (
    <Box className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          component={Link}
          to="/"
          startIcon={<FaArrowLeft />}
          className="mb-6 dark:text-gray-300"
        >
          Back to Home
        </Button>

        <Paper className="p-6 dark:bg-gray-800 dark:text-white">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={country.flag.url_svg || country.flag.url_png}
                alt={country.names.common}
                className="w-full rounded-lg shadow"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
            </div>

            <div className="md:w-2/3 space-y-4">
              <Typography variant="h4" className="font-bold dark:text-white">
                {country.names.common} {country.flag.emoji}
              </Typography>

              {nativeNames.length > 0 && (
                <Typography variant="body1" className="dark:text-gray-300">
                  <strong>Native Name(s):</strong> {nativeNames.join(", ")}
                </Typography>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <Typography className="dark:text-gray-300">
                  <strong>Region:</strong> {country.region}
                </Typography>
                <Typography className="dark:text-gray-300">
                  <strong>Subregion:</strong> {country.subregion || "N/A"}
                </Typography>
                <Typography className="dark:text-gray-300">
                  <strong>Capital:</strong> {country.capitals?.[0]?.name || "N/A"}
                </Typography>
                <Typography className="dark:text-gray-300">
                  <strong>Population:</strong> {formatPopulation(country.population)}
                </Typography>
                <Typography className="dark:text-gray-300">
                  <strong>Area:</strong> {formatArea(country.area)}
                </Typography>
                <Typography className="dark:text-gray-300">
                  <strong>TLD:</strong> {country.tlds?.join(", ") || "N/A"}
                </Typography>
                <Typography className="dark:text-gray-300">
                  <strong>Currencies:</strong> {formatCurrencies(country.currencies)}
                </Typography>
                <Typography className="dark:text-gray-300">
                  <strong>Languages:</strong> {formatLanguages(country.languages)}
                </Typography>
                <Typography className="dark:text-gray-300 sm:col-span-2">
                  <strong>Timezones:</strong> {country.timezones?.join(", ") || "N/A"}
                </Typography>
              </div>

              {borders.length > 0 && (
                <div className="pt-4">
                  <Typography variant="h6" className="mb-2 dark:text-white">
                    Border Countries
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {borders.map((b) => (
                      <Chip
                        key={b.codes.alpha_3}
                        label={b.names.common}
                        component={Link}
                        to={`/country/${b.codes.alpha_3}`}
                        clickable
                        variant="outlined"
                        className="dark:text-gray-300 dark:border-gray-500"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-2">
                {country.links?.google_maps && (
                  <Button
                    variant="outlined"
                    href={country.links.google_maps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Maps
                  </Button>
                )}
                {country.links?.wikipedia && (
                  <Button
                    variant="outlined"
                    href={country.links.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wikipedia
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </Box>
  );
}
