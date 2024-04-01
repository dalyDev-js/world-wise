import { createContext, useContext, useEffect, useState } from "react";
import uuid from "react-uuid";
const CitiesContext = createContext();

// eslint-disable-next-line react/prop-types

const data = [
  {
    cityName: "Cairo",
    country: "Egypt",
    emoji: "🇪🇬",
    date: "2024-10-31T15:59:59.138Z",
    notes: "This is where I live 😊🙋‍♂️",
    position: {
      lat: 29.98077,
      lng: 30.913933,
    },
    id: "13930385",
  },
  {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: "73930385",
  },
  {
    cityName: "Madrid",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: "17806751",
  },
  {
    cityName: "Berlin",
    country: "Germany",
    emoji: "🇩🇪",
    date: "2027-02-12T09:24:11.863Z",
    notes: "Amazing 😃",
    position: {
      lat: 52.53586782505711,
      lng: 13.376933665713324,
    },
    id: "98443197",
  },
  {
    id: "cb41",
    cityName: "Antalya",
    country: "Turkiye",
    emoji: "🇹🇷",
    date: "2023-11-09T18:06:05.000Z",
    notes: "Best Trip EVER !! :)",
    position: {
      lat: "36.88511287236025",
      lng: "30.751419067382812",
    },
  },
  {
    id: "3c06",
    cityName: "Marsa Maţruḩ",
    country: "Egypt",
    emoji: "🇪🇬",
    date: "2024-04-01T22:00:38.094Z",
    notes: "dada",
    position: {
      lat: "30.14512718337613",
      lng: "26.828613281250004",
    },
  },
];

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);

        setCities(data);
      } catch {
        alert("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const selectedCity = data.find((city) => city.id === id);
      console.log(selectedCity);
      setCurrentCity(selectedCity);
    } catch {
      alert("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);

      const id = uuid();
      const cityWithId = { ...newCity, id };
      setCities((cities) => [...cities, cityWithId]);
      setCurrentCity(cityWithId);
    } catch {
      alert("Error adding a city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("Error deleting city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext cannot be used outside the CitiesProvider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
