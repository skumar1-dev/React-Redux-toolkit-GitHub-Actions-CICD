import React, { useState } from 'react'
import { addToCart, removeFromCart, clearCart, increment, decriment } from '../../feature/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Cart() {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    const shippingCharge = 10;
    const tax = 20;

    const removeFromCartHandler = (e, id) => {
        e.preventDefault();
        dispatch(removeFromCart(id))
        toast.success("product remove from cart successfully!");

    }
    const Inceriment = (e, id) => {
        debugger;
        e.preventDefault();
        dispatch(increment(id));
        toast.success("product add to cart successfully!");

    }
    const Decriment = (e, id) => {
        debugger;
        e.preventDefault();
        dispatch(decriment(id));
        toast.success("product remove from cart successfully!");

    }

    const clearCartHandler = () => {
        dispatch(clearCart());
    }
    return (
        <div className="container py-5">
            {/* <h1 className="mb-5">Your Shopping Cart</h1> */}
            <div className="row">
                <div className="col-lg-8">
                    {/* Cart Items */}
                    <div className="card mb-4">
                        <div className="card-body">

                            {cartItems.length === 0 ?
                                <div style={{ textAlign: 'center' }}>
                                    Cart is empty
                                </div> :
                                cartItems.map((item, index) => (
                                    <div className="row cart-item">
                                        <div className="col-md-3">
                                            <img src={item.images} alt="Product 2" className="img-fluid rounded" />
                                        </div>
                                        <div className="col-md-5">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="text-muted">Category: {item.category}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="input-group">
                                                <button style={{ width: '25px' }}
                                                    className="btn btn-outline-secondary btn-sm"
                                                    type="button"
                                                    onClick={(e) => Decriment(e, item.id)}
                                                >-
                                                </button>
                                                <input style={{ maxWidth: 100 }} type="text"
                                                    className="form-control form-control-sm text-center quantity-input"
                                                    defaultValue={0} value={item.quantity} />
                                                <button
                                                    style={{ width: '25px' }}
                                                    className="btn btn-outline-secondary btn-sm"
                                                    type="button"
                                                    onClick={(e) => Inceriment(e, item)}
                                                >+
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-end">
                                            <p className="fw-bold">${item.price}</p>
                                            <button style={{ backgroundColor: '#dc3545' }}
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={(e) => removeFromCartHandler(e, item.id)}>
                                                Remove
                                                {/* <i className="bi bi-trash" /> */}
                                            </button>
                                        </div>
                                    </div>
                                ))

                            }

                        </div>
                    </div>
                    {/* Continue Shopping Button */}
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%', textAlign: 'left' }} >
                            <Link to="/product" style={{ width: '50%', backgroundColor: '#0d6efd' }}
                                className="btn btn-sm btn-outline-primary">
                                Continue Shopping
                            </Link>
                        </div>
                        <div style={{ width: '50%', textAlign: 'right' }} >
                            <button style={{ width: '50%', backgroundColor: '#dc3545' }}
                                className="btn btn-sm btn-outline-danger"
                                onClick={clearCartHandler}>
                                Clear Shopping Cart
                            </button>

                        </div>
                    </div>


                </div>
                <div className="col-lg-4">

                    {/* Cart Summary */}
                    < div className="card cart-summary">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping</span>
                                <span>${shippingCharge.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong>Total</strong>
                                <strong>${(totalPrice + shippingCharge + tax).toFixed(2)}</strong>
                            </div>
                            <button style={{ width: '25%' }} className="btn btn-sm btn-outline-primary w-100" >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                    {/* Promo Code */}
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Apply Promo Code</h5>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter promo code" />
                                <button className="btn btn-sm btn-outline-secondary"
                                    type="button">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <ToastContainer />
        </div >


    )
}

export default Cart