const initialState = {
    userInfo: {},
    clients: []
};

const cashCoStore = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER":
            return {
                ...state,
                userInfo: action.payload
            };

        case "USER_SEARCH":
            return {
                ...state,
                clients: action.payload
            };

        default:
            return state;
    }
};

export default cashCoStore;