import { useEffect, useState } from "react";

import { getAll } from "../../common/api/country";

const LIMIT = 15;

export function Countries() {
  const [countries, setCountries] = useState([]);
  const [start, setStart] = useState(0);

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

  return (
    <div>
      {countries.slice(start, start + LIMIT).map((country, index) => (
        <p key={index}>{country.name.common}</p>
      ))}
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
