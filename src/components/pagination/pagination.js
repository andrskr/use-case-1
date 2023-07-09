import styles from "./pagination.module.css"; // Update this path to point to your CSS module

export function Pagination({ onPrevPage, onNextPage }) {
  return (
    <div className={styles.pagination}>
      <button type="button" onClick={onPrevPage}>
        Prev
      </button>
      <button type="button" onClick={onNextPage}>
        Next
      </button>
    </div>
  );
}
