import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

const Menu = (props) => {
    const priceRef = useRef()
    let dispatch = useDispatchCart()
    let data = useCart()
    let option = props.option;
    let priceOption = Object.keys(option)
    /* for bu default size */
    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")
    //prop driling problem solving=> context API or reducer
    const handleAddToCart = () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            } else if (food.size !== size) {
                dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return
            }
            return
        }
        dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }

    // ?console.log(data)

    let finalPrice = qty * parseInt(option[size])
    useEffect(() => {
        setsize(priceRef.current.value)
    }, [])
    return (
        <div className='d-flex col-md-4'>
            <div className="body mt-3">
                <div className="card" style={{ width: "18rem", maxHeight: "260" }}>
                    <img src={props.foodItem.img} style={{ height: "220px", objectFit: "fill" }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <p className="card-text">{props.foodItem.description}</p>
                        <div className="container w-100">
                            <select className='m-1 h-100 bg-success rounded' onChange={(e) => setqty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-1 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
                                {priceOption.map((data) => {
                                    return <option key={data} value={data}>{data}</option>

                                })}
                            </select>
                            <div className='d-inline h-100 fs-6'>
                                Rs{finalPrice}/-
                            </div>
                            <hr />
                            <button className='ms-2 justify-center btn btn-success' onClick={handleAddToCart}> Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu