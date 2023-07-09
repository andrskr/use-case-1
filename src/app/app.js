import { CountryFilter } from "../components/country-filter";
import { Countries } from "../components/countries/countries";

import styles from "./app.module.css";
import { useState } from "react";

export function App() {
  const [query, setQuery] = useState("");
  const [populationLimit, setPopulationLimit] = useState(Infinity);
  const [sortOrder, setSortOrder] = useState("ascend");

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
    </main>
  );
}
