import { CountryFilter } from "../components/country-filter";
import { Pagination } from "../components/pagination";
import { Countries } from "../components/countries/countries";

import styles from "./app.module.css";
import { useState } from "react";

export function App() {
  const [query, setQuery] = useState("");
  const [populationLimit, setPopulationLimit] = useState(Infinity);
  const [sortOrder, setSortOrder] = useState("ascend");

  const handlePrevPage = () => {
    // Add your logic for loading the previous page here
  };

  const handleNextPage = () => {
    // Add your logic for loading the next page here
  };

  return (
    <main className={styles.container}>
      <CountryFilter
        onQueryChange={setQuery}
        query={query}
        populationLimit={populationLimit}
        setPopulationLimit={setPopulationLimit}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <Countries
        query={query}
        populationLimit={populationLimit}
        sortOrder={sortOrder}
      />
      {/*<Pagination onNextPage={handleNextPage} onPrevPage={handlePrevPage} />*/}
    </main>
  );
}
