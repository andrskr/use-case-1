import { useEffect, useState } from "react";
import { useCountries } from "./use-countries";

export function Countries({ query }) {
  const { countries, handleNext, handlePrev, isStale } = useCountries(query);

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
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
