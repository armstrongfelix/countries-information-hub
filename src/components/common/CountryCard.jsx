import { Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatPopulation } from "../../utils/formatters";

export default function CountryCard({ country, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer transition-transform hover:scale-[1.02] dark:bg-gray-800 dark:text-white"
      onClick={() => navigate(`/country/${country.codes.alpha_3}`)}
    >
      <CardMedia
        component="img"
        height="140"
        image={country.flag.url_svg || country.flag.url_png}
        alt={country.names.common}
        className="h-36 object-cover"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <CardContent className="dark:text-gray-200">
        <div className="flex items-center justify-between">
          <Typography variant="h6" className="dark:text-white font-semibold truncate">
            {country.names.common}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(country.codes.alpha_3);
            }}
            className={isFavorite ? "text-red-500" : "text-gray-400"}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </IconButton>
        </div>
        <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
          Region: {country.region}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
          Population: {formatPopulation(country.population)}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
          Capital: {country.capitals?.[0]?.name || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}
