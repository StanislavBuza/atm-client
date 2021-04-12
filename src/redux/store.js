import {applyMiddleware, createStore} from "redux";
import cashCoStore from "../redux/reducer";
import thunk from "redux-thunk"

const store = createStore(cashCoStore,
    applyMiddleware(thunk),
);

export default store;