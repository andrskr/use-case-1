import { useState, useEffect, useMemo, useDeferredValue } from "react";
import { getAll } from "../../common/api/country";

const ONE_MIL = 1_000_000;
const LIMIT = 15;

export function useCountries(filters) {
  const [countries, setCountries] = useState([]);
  const [offset, setOffset] = useState(0);
  const deferredFilters = useDeferredValue(filters);
  const deferredOffset = useDeferredValue(offset);

  const isStale = filters !== deferredFilters;

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

  const goNext = () => {
    setOffset((oldStart) => Math.min(oldStart + LIMIT, countries.length - 1));
  };

  const goPrev = () => {
    setOffset((oldStart) => Math.max(oldStart - LIMIT, 0));
  };

  const currentCountries = useMemo(() => {
    const lowerCaseSearchString = deferredFilters.query.toLowerCase();
    return countries
      .filter((country) => {
        const isNameMatched = country.name.common
          .toLowerCase()
          .includes(lowerCaseSearchString);
        const parsedPopulation = Number.parseFloat(
          deferredFilters.populationLimit
        );

        const isPopulationMatched = Number.isFinite(parsedPopulation)
          ? country.population / ONE_MIL < parsedPopulation
          : true;

        return isNameMatched && isPopulationMatched;
      })
      .sort((a, b) => {
        if (deferredFilters.sortOrder === "ascend") {
          return a.name.common.localeCompare(b.name.common);
        } else if (deferredFilters.sortOrder === "descend") {
          return b.name.common.localeCompare(a.name.common);
        } else {
          return 0; // default to original order if sortOrder is neither 'ascend' nor 'descend'
        }
      });
  }, [deferredFilters, countries]);

  const paginatedCountries = useMemo(
    () => currentCountries.slice(deferredOffset, deferredOffset + LIMIT),
    [currentCountries, deferredOffset]
  );

  return {
    countries: paginatedCountries,
    isStale,
    goNext,
    goPrev,
    canNext: deferredOffset < currentCountries.length - LIMIT,
    canPrev: deferredOffset > 0,
  };
}
