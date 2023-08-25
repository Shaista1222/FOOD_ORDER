import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'

import Model from '../Model'
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer';
import { Link, useNavigate } from 'react-router-dom'
const Header = () => {
    let data = useCart()
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate()
    const HandleClick = () => {

        localStorage.removeItem("authToken")
        navigate("/login")
    }
    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-light sticky" >
                <div className="container-fluid " style={{ color: '#E75480' }}>
                    <Link className="navbar-brand fs-1 fst-italic" to="/" >FoodPanda</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <ul className="navbar-nav mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-4" aria-current="page" to="/" >Home</Link>
                            </li>
                            {/* //if user is login */}
                            {localStorage.getItem("authToken") ?
                                <li className="nav-item">
                                    <Link className="nav-link  fs-4" aria-current="page" to="/myOrder" >My Orders</Link>
                                </li>
                                : ""
                            }
                        </ul>
                        {/* //if user is not login */}
                        {!localStorage.getItem("authToken") ?
                            <div className='d-flex'>
                                <Link className="nav-link mx-1 fs-5 btn btn-success text-dark" to="/login">Login</Link>

                                <Link className="nav-link mx-1 fs-5 btn btn-success text-dark" to="/SignUp" >SignUp</Link>

                            </div>
                            :
                            <div>
                                <div className='btn btn-success text-light mx-1' onClick={() => setCartView(true)}>
                                    Cart{"  "}
                                    <Badge pill bg="danger">{data.length}</Badge>
                                </div>
                                {cartView ? <Model onClose={() => setCartView(false)}><Cart /></Model> : ""}
                                <div className='btn btn-danger text-light mx-1' onClick={HandleClick}>
                                    Logout
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header