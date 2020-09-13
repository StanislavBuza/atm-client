const updateCartItems = (cartItems, item, idx) => {

    if (item.count === 0) {
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
        total = 0
    } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    };
};

const updateOrder = (state, bookId, quantity) => {
    const {bookList: {books}, shoppingCart: {cartItems}} = state;
    const book = books.find((book) => book.id === bookId);
    const itemIndex = cartItems.findIndex((book) => book.id === bookId);
    const item = cartItems[itemIndex];

    const newItem = updateCartItem(book, item, quantity);

    return {
        orderTotal: cartItems.reduce((acc, cur) => acc + cur.total, book.price),
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };
};


const updateShoppingCart = (state, action) => {

    if(state === undefined){
        return {
            cartItems: [],
            orderTotal: 0
        };
    }

    switch (action.type) {
        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, action.payload, 1);

        case 'BOOK_DELETE_FROM_CART':
            return updateOrder(state, action.payload, -1);

        case 'ALL_BOOKS_DELETE_FROM_CART':
            const item = state.shoppingCart.cartItems.find((book) => book.id === action.payload);
            return updateOrder(state, action.payload, -item.count);
        default:
            return state.shoppingCart;
    }

};

export default updateShoppingCart;