import React from "react";
import "./shop-header.css"
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const ShopHeader = (props) => {
    const {shoppingCart} = props;
    const totalItems = shoppingCart.cartItems.reduce((acc, cartItems) => acc + cartItems.count, 0);
    return (
        <header className="shop-header row">
            <Link to={"/"}>
                <div className="logo text-dark">BookStore</div>
            </Link>
            <Link to="/cart">
                <div className="shopping-cart">
                    <i className="cart-icon fa fa-shopping-cart"/>
                    {totalItems} items(${shoppingCart.orderTotal})
                </div>
            </Link>
        </header>
    )
};

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart
    }
};

export default connect(mapStateToProps)(ShopHeader);