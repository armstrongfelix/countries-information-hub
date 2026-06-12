# 🌍 Countries Information Hub

A modern, responsive web application for exploring comprehensive information about countries around the world. Built with React, featuring real-time search, filtering, pagination, and a favorites management system.

## ✨ Features

- **Search Countries**: Real-time search functionality with debouncing for optimal performance
- **Filter by Region**: Filter countries by geographical regions
- **Pagination**: Browse countries with 24 items per page
- **Country Details**: View detailed information about each country including:
  - Population statistics
  - Area measurements
  - Capital city
  - Currencies
  - Languages
  - Borders and regional information
- **Favorites System**: Save and manage your favorite countries with persistent storage
- **Dark/Light Theme**: Toggle between dark and light themes (preference saved locally)
- **Error Handling**: Graceful error handling with retry functionality
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Loading States**: Visual loading indicators while fetching data

## 🛠️ Tech Stack

### Frontend
- **React** (v19.2.6) - UI library
- **Vite** (v8.0.12) - Build tool and dev server
- **React Router** (v7.17.0) - Client-side routing
- **Zustand** (v5.0.14) - State management with persistence
- **Material-UI** (v9.1.1) - Component library
- **Tailwind CSS** (v4.3.0) - Utility-first CSS framework
- **React Icons** (v5.6.0) - Icon library

### Development
- **ESLint** - Code linting
- **Emotion** - CSS-in-JS library

### Data Source
- **REST Countries API** - Comprehensive country information data

## 📁 Project Structure

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── CountryCard.jsx          # Country display card
│   │   ├── ErrorBoundary.jsx        # Error boundary wrapper
│   │   ├── ErrorMessage.jsx         # Error display component
│   │   ├── Loader.jsx              # Loading spinner
│   │   ├── Pagination.jsx          # Pagination controls
│   │   ├── RegionFilter.jsx        # Region filtering dropdown
│   │   └── SearchBar.jsx           # Search input component
│   └── layout/
│       └── Navbar.jsx              # Navigation bar with theme toggle
├── pages/                   # Page components
│   ├── Home.jsx            # Main countries listing page
│   ├── CountryDetails.jsx  # Individual country details page
│   ├── Favorites.jsx       # Saved favorites page
│   └── NotFound.jsx        # 404 page
├── context/
│   └── ThemeContext.jsx    # Dark/Light theme management
├── hooks/
│   └── useDebounce.js      # Debounce hook for search optimization
├── store/
│   └── useCountryStore.js  # Zustand store for global state management
├── services/
│   └── api.js              # API calls to REST Countries
├── utils/
│   └── formatters.js       # Utility functions for data formatting
├── App.jsx                 # Main app component with routing
└── main.jsx               # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd countries-information-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   VITE_API_BASE_URL=https://api.restcountries.com/v3.1/all
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or the port shown in your terminal)

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🎯 Usage

### Browsing Countries
1. Open the application and you'll see the home page with a list of countries
2. Use the **Search Bar** to find countries by name
3. Use the **Region Filter** dropdown to filter by geographical regions
4. Browse through pages using the pagination controls

### Viewing Country Details
1. Click on any country card to view detailed information
2. See population, area, currencies, languages, and more
3. Add the country to favorites from the details page

### Managing Favorites
1. Click the heart icon on any country card to add/remove from favorites
2. Visit the **Favorites** page to see all saved countries
3. Favorites are automatically saved to your browser's local storage

### Theme Toggle
1. Click the theme toggle button in the navbar
2. Choose between light and dark themes
3. Your preference is saved automatically

## 🏗️ Architecture

### State Management (Zustand Store)
The app uses Zustand for centralized state management:
- Countries data fetching and caching
- Search and filter queries
- Favorites management
- Loading and error states

The store persists data to localStorage, so user preferences and favorites survive page refreshes.

### Context API
The `ThemeContext` manages application-wide theme state with localStorage persistence.

### Hooks
- `useDebounce`: Optimizes search performance by delaying API calls
- Custom hooks leverage React's composition model for code reusability

## 🔄 Data Flow

1. User opens app → `fetchCountries()` called in Home component
2. Zustand store fetches data from REST Countries API
3. Data is stored in global state and persisted to localStorage
4. Filtering and searching happens on client-side cached data
5. Results are paginated and displayed in the UI

## 🎨 Styling

The project uses a combination of:
- **Tailwind CSS** for utility-based styling and responsive design
- **Material-UI** for pre-built, accessible components
- **Emotion** for CSS-in-JS when needed
- Custom dark mode with localStorage persistence

## 📱 Responsive Design

The application is fully responsive:
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🐛 Error Handling

The app includes comprehensive error handling:
- Error boundary component for React errors
- API error messages with retry functionality
- Graceful fallbacks for missing data
- Loading states during data fetches

## 📊 Performance Optimizations

- **Debounced Search**: Reduces API calls during typing
- **Lazy Loading**: Data loaded on demand
- **State Persistence**: Reduces unnecessary API calls
- **Memoization**: Optimized re-renders with `useMemo`

## 🔐 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern mobile browsers

## 📝 License

This project is part of the OpenCode coursework.

## 🤝 Contributing

Feel free to fork, modify, and enhance this project as needed.

---

**Built with ❤️ for exploring our world**
