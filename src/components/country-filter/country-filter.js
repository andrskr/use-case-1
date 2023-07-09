import { useState } from "react";

import styles from "./country-filter.module.css";

export function CountryFilter() {
  const [countryName, setCountryName] = useState("");
  const [countryPopulation, setCountryPopulation] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call here using countryName, countryPopulation, and sortOrder
  };

  return (
    <form id="filter-form" onSubmit={handleSubmit}>
      <h1>Country Filter</h1>
      <div className={styles.formGroup}>
        <label htmlFor="country-name">Country Name</label>
        <input
          type="text"
          id="country-name"
          name="country-name"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="country-population">Country Population</label>
        <input
          type="text"
          id="country-population"
          name="country-population"
          value={countryPopulation}
          onChange={(e) => setCountryPopulation(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="sort-by-name">Sort By Name</label>
        <select
          id="sort-by-name"
          name="sort-by-name"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
    </form>
  );
}
