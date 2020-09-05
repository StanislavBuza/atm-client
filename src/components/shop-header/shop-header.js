import React from "react";
import "./shop-header.css"
import {Link} from "react-router-dom";

const ShopHeader = (props) => {
    const {numItems, total} = props;
    return (
        <header className="shop-header row">
            <Link to={"/"}>
                <div className="logo text-dark">BookStore</div>
            </Link>
            <Link to="/cart">
                <div className="shopping-cart">
                    <i className="cart-icon fa fa-shopping-cart"/>
                    {numItems} items(${total})
                </div>
            </Link>
        </header>
    )
};

export default ShopHeader;