import { useState, useEffect, useRef, useMemo, useDeferredValue } from "react";
import { getAll } from "../../common/api/country";

const LIMIT = 15;

export function useCountries(query) {
  const [countries, setCountries] = useState([]);
  const [start, setStart] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await getAll();
        if (!controller.signal.aborted) {
          setCountries(response.data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch countries:", error);
        }
      }
    };

    void fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const handleNext = () => {
    setStart((oldStart) => Math.min(oldStart + LIMIT, countries.length - 1));
  };

  const handlePrev = () => {
    setStart((oldStart) => Math.max(oldStart - LIMIT, 0));
  };

  const lowerCaseSearchString = deferredQuery.toLowerCase();
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(lowerCaseSearchString)
  );

  const currentCountries = filteredCountries.slice(start, start + LIMIT);

  return { countries: currentCountries, handleNext, handlePrev, isStale };
}
