import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

function Pagination({ pageCount, onPageChange }) {
  return (
    <ReactPaginate
      className={styles.root}
      activeClassName={styles.selected}
      disabledLinkClassName={styles.disabled}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
    />
  );
}

export default Pagination;
