import React from "react";
import "./atm-header.css"
import {Link} from "react-router-dom";
import moment from "moment";

const AtmHeader = () => {
    const date = moment(new Date()).format('MMMM Do YYYY, h:mm a');
    return (
        <header className="atm-header row">
            <Link to={"/"}>
                <div className="logo text-dark">
                    CashCo
                    <i className="fa fa-university" aria-hidden="true"/>
                </div>
            </Link>

            <div className="contact-us">
                Contact us: 1-888-000-800
                <span className="date">{date} </span>

            </div>

        </header>
    )
};

export default AtmHeader;