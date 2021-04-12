import React from "react";
import {Route, Switch} from "react-router-dom";
import {UserPage, HomePage, AdminPage} from "../pages";
import AtmHeader from "../atm-header";

import "./app.css";

const App = () => {
    return (
        <main role="main" className="container">
        <AtmHeader/>
            <Switch>

                <Route
                    path="/"
                    component={HomePage}
                    exact
                />

                <Route
                    path="/accountInfo/:accountNumber"
                    component={UserPage}
                />

                <Route
                    path="/admin/:accountNumber"
                    component={AdminPage}
                />

                <Route
                    path="*"
                    component={HomePage}
                />
            </Switch>
        </main>


    );
};

export default App;