const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
};

const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
};

const bookAddedToCart = (bookId) => {
    return {
        type: 'BOOK_ADDED_TO_CART',
        payload: bookId
    }
};

const allBooksDeleteFromCart = (bookId) => {
    return {
        type: 'ALL_BOOKS_DELETE_FROM_CART',
        payload: bookId
    }
};

const bookDeleteFromCart = (bookId) => {
    return {
        type: 'BOOK_DELETE_FROM_CART',
        payload: bookId
    }
};

const booksError = (error) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
};

export {
    booksLoaded,
    booksRequested,
    booksError,
    bookAddedToCart,
    bookDeleteFromCart,
    allBooksDeleteFromCart
};