import PropTypes from 'prop-types';
import React from 'react'
import styles from '../styles/Pagination.module.css'

export default function TablePaginationActions(props) {
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={styles.root}>
            <div>
                <span>
                    {
                        (count < rowsPerPage)
                            ? `${(page + 1) * rowsPerPage - rowsPerPage + 1} - ${count} of ${count}`
                            : `${(page + 1) * rowsPerPage - rowsPerPage + 1} - ${(page + 1) * rowsPerPage} of ${count}`}
                </span>
            </div>
            <button
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.293 17.707L17.707 16.293 13.414 12 17.707 7.707 16.293 6.293 10.586 12zM7 6H9V18H7z" />
                </svg>
            </button>
            <button onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="30.9,43 34,39.9 18.1,24 34,8.1 30.9,5 12,24" />
                </svg>
            </button>
            <button
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="17.1,5 14,8.1 29.9,24 14,39.9 17.1,43 36,24" />
                </svg>
            </button>
            <button
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.707 17.707L13.414 12 7.707 6.293 6.293 7.707 10.586 12 6.293 16.293zM15 6H17V18H15z" />
                </svg>
            </button>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};