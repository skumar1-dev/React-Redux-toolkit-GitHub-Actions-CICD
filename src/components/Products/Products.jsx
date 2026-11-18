import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../feature/products/productSlice'
import { useNavigate } from 'react-router-dom'

import { addToCart, removeFromCart, clearCart } from '../../feature/cart/cartSlice'


function Products() {
    // const [state, setState] = useState({
    //     items: []
    // })

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { items, status, error } = useSelector(state => state.products);

    const cartItems = useSelector(state => state.cart.cartItems);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [dispatch, status])


    const addToCartHandler = (e, product) => {
        e.preventDefault();
        dispatch(addToCart(product));
        toast.success("product add to cart successfully!");
    }

    const removeFromCartHandler = (e, id) => {
        e.preventDefault();
        dispatch(removeFromCart(id));
        toast.warn("product remove from cart successfully!");
    }

    const carthandler = () => {
        navigate("/product/cart");
    }

    if (status === "pending") return <p>Loding Products...</p>
    if (status === "error") return <p>error: {error}</p>

    return (
        <div>
            <div className="container">
                <div className='row' style={{ marginTop: '15px' }}>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Navbar</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                                    </li>
                                </ul>
                                {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}


                            </div>
                            <button className='btn btn-outline-secondary btn-sm position-relative' onClick={loginhandler}>Login
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                  
                                </span>
                            </button>
                            <button className='btn btn-outline-secondary btn-sm position-relative' onClick={carthandler}>Cart
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems.length}
                                    {/* <span className="visually-hidden">unread messages</span> */}
                                </span>
                            </button>
                        </div>
                    </nav>

                </div>
                <div className="row align-items-start">
                    {
                        items.map((product, index) => (
                            <div key={index} className="col" style={{ margin: '25px' }}>
                                <div className="card" style={{ width: '18rem' }}>
                                    <img src={product.images} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title bold">{product.title}</h5>
                                        <p className="card-text">
                                            {product.description.slice(0, 50)}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="h5 mb-0">${product.price}</span>
                                            <div>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <i className="bi bi-star-half text-warning"></i>
                                                <small className="text-muted">{55}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between">
                                        <button className="btn btn-primary btn-sm" style={{ backgroundColor: '#0a58ca' }} onClick={(e) => addToCartHandler(e, product)}>Add to Cart</button>
                                        <button className="btn btn-danger btn-sm" style={{ backgroundColor: '#dc3545' }} onClick={(e) => removeFromCartHandler(e, product.id)}>Remove from Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>

            </div>
            <ToastContainer />
        </div>


    )
}

export default Products