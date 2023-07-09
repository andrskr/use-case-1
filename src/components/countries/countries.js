import { useMemo, useState } from "react";

import { useCountries } from "./use-countries";
import { Pagination } from "../pagination";

const LIMIT = 15;

export function Countries({ query, populationLimit, sortOrder }) {
  const [offset, setOffset] = useState(0);
  const filters = useMemo(
    () => ({ query, populationLimit, sortOrder, offset, limit: LIMIT }),
    [query, populationLimit, sortOrder, offset]
  );

  const { countries, totalCount = 0, isStale } = useCountries(filters);

  const handleNext = () => {
    setOffset((oldStart) => Math.min(oldStart + LIMIT, totalCount));
  };

  const handlePrev = () => {
    setOffset((oldStart) => Math.max(oldStart - LIMIT, 0));
  };

  return (
    <div
      style={{
        opacity: isStale ? 0.5 : 1,
        transition: isStale
          ? "opacity 0.2s 0.2s linear"
          : "opacity 0s 0s linear",
      }}
    >
      {countries.map((country, index) => (
        <p key={index}>{country.name.common}</p>
      ))}
      <Pagination
        onNextPage={handleNext}
        onPrevPage={handlePrev}
        canPrev={offset > 0}
        canNext={offset < totalCount - LIMIT}
      />
    </div>
  );
}
