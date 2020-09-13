const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 1099
};

const updateCartItems = (cartItems, item, idx) => {

    if(item.count === 0){
        return [
            ...cartItems.splice(0, idx),
            ...cartItems.splice(idx + 1)
        ]
    }

    if (idx === -1) {
        return [...cartItems,
            item
        ];
    }

    return [
        ...cartItems.splice(0, idx),
        item,
        ...cartItems.splice(idx + 1)
    ]

};



const updateCartItem = (book, item = {}, quantity) => {

    const {
        id = book.id,
        count = 0,
        title = book.title,
        total = 0} = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    };
};

const updateOrder = (state, bookId, quantity) => {
    const {books, cartItems} = state;
    const book = books.find((book) => book.id === bookId);
    const itemIndex = cartItems.findIndex((book) => book.id === bookId);
    const item = cartItems[itemIndex];

    const newItem = updateCartItem(book, item, quantity);

    return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
    };
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            };

        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, action.payload,1);

        case 'BOOK_DELETE_FROM_CART':
            return updateOrder(state, action.payload,-1);

        case 'ALL_BOOKS_DELETE_FROM_CART':
            const item = state.cartItems.find((book) => book.id === action.payload);
            return updateOrder(state, action.payload,-item.count);

        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            };

        default:
            return state
    }
};

export default reducer;