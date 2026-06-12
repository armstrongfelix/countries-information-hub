import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { getAllCountries } from "../services/api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
let offset = 0;

export const useCountryStore = create(
  persist(
    (set, get) => ({
      currentFetch: [],
      countries: [],
      isLoading: false,
      error: null,
      searchQuery: "",
      selectedRegion: "",
      favorites: [],

      fetchCountries: async () => {
        set({ isLoading: true, error: null });
        try {
          // const data = await getAllCountries();
          let res = await fetch(`${BASE_URL}&offset=${offset}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch countries: ${res.status}`);
          }
          let json = await res.json();
          let data = json.data.objects;

          set({ currentFetch: data });
          set((state) => ({
            countries: [...state.countries, ...state.currentFetch],
            isLoading: false,
          }));

          if (offset <= 0) {
            set({ isLoading: true });
            offset += 100;
            let res = await fetch(
              `${BASE_URL}&offset=${offset}  { headers: { 'Authorization': 'Bearer rc_live_5fd9d335af0e42b29c0fb305b121579e' } `,
            );
            if (!res.ok) {
              throw new Error(`Failed to fetch countries: ${res.status}`);
            }
            let json = await res.json();

            let data = json.data.objects;

            set({ currentFetch: data });
            set((state) => ({
              countries: [...state.countries, ...state.currentFetch],
              isLoading: false,
            }));
          }
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedRegion: (region) => set({ selectedRegion: region }),

      toggleFavorite: (alpha3) => {
        const { favorites } = get();
        set({
          favorites: favorites.includes(alpha3)
            ? favorites.filter((c) => c !== alpha3)
            : [...favorites, alpha3],
        });
      },

      getFilteredCountries: () => {
        const { countries, searchQuery, selectedRegion } = get();
        return countries.filter((c) => {
          const matchesSearch = c.names.common
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const matchesRegion = selectedRegion
            ? c.region === selectedRegion
            : true;
          return matchesSearch && matchesRegion;
        });
      },

      getCountryByAlpha3: (alpha3) => {
        const { countries } = get();
        return countries.find((c) => c.codes.alpha_3 === alpha3) || null;
      },
    }),
    {
      name: "country-hub-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
