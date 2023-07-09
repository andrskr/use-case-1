import styles from "./pagination.module.css"; // Update this path to point to your CSS module

export function Pagination({ onPrevPage, onNextPage, canPrev, canNext }) {
  return (
    <div className={styles.pagination}>
      <button type="button" disabled={!canPrev} onClick={onPrevPage}>
        Prev
      </button>
      <button type="button" disabled={!canNext} onClick={onNextPage}>
        Next
      </button>
    </div>
  );
}
