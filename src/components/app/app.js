import React from "react";
// import {Route, Switch} from "react-router-dom";
// import {Route, Switch} from "react-router-dom"
import './app.css';
import { CartPage, HomePage } from "../pages";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <Switch>

            <Route
                path="/"
                component={HomePage}
                exact
                />
            <Route
                path="/cart"
                component={CartPage}
                />
        </Switch>


    );
};

export default App;