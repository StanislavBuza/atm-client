export const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
};

export const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
};

export const bookAddedToCart = (bookId) => {
    return {
        type: 'BOOK_ADDED_TO_CART',
        payload: bookId
    }
};

export const allBooksDeleteFromCart = (bookId) => {
    return {
        type: 'ALL_BOOKS_DELETE_FROM_CART',
        payload: bookId
    }
};

export const bookDeleteFromCart = (bookId) => {
    return {
        type: 'BOOK_DELETE_FROM_CART',
        payload: bookId
    }
};

export const booksError = (error) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
};

// const fetchBooksOld = (bookstoreService, dispatch) => () => {
//         dispatch(booksRequested());
//         bookstoreService.getBooks()
//             .then((data) => dispatch(booksLoaded(data)))
//             .catch((err) => dispatch(booksError(err)));
// };

const fetchBooks = (bookstoreService) => () => (dispatch) => {
    dispatch(booksRequested());
    bookstoreService.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((err) => dispatch(booksError(err)));
};

export {
    fetchBooks
};