import { CountryFilter } from "../components/country-filter";
import { Pagination } from "../components/pagination";
import { Countries } from "../components/countries/countries";

import styles from "./app.module.css";

export function App() {
  const handlePrevPage = () => {
    // Add your logic for loading the previous page here
  };

  const handleNextPage = () => {
    // Add your logic for loading the next page here
  };

  return (
    <main className={styles.container}>
      <CountryFilter />
      <Countries />
      <Pagination onNextPage={handleNextPage} onPrevPage={handlePrevPage} />
    </main>
  );
}
