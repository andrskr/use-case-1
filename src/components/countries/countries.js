import { useMemo, useState } from "react";

import { useCountries } from "./use-countries";
import { Pagination } from "../pagination";

export function Countries({ query, populationLimit, sortOrder }) {
  const filters = useMemo(
    () => ({ query, populationLimit, sortOrder }),
    [query, populationLimit, sortOrder]
  );

  const { countries, goPrev, goNext, canNext, canPrev, isStale } =
    useCountries(filters);

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
        onNextPage={goNext}
        onPrevPage={goPrev}
        canPrev={canPrev}
        canNext={canNext}
      />
    </div>
  );
}
