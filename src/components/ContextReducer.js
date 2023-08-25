import React, { createContext, useContext, useReducer } from 'react'
//dispatch ko action bataenge, and is state ko change krna hai
//a change in a peace of code at a global, that will reflect in application
//like in add to cart button we want tat whatever selected wo sara My Cart m jana chahiye.
//Children could a component of multiple components
//dispatch kisi cheez ko bejna
const CartStateContext = createContext()//this is for globally chnage
const CartDispatchContext = createContext()
const reducer = (state, action) => {

    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr
        case "DROP":
            let empArray = []
            return empArray
        //if qty change but size same then update qty not add another food, if size chnage then add food with size
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
            })
            return newArr
        default: console.log("Entered in reducer.")
    }

}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []); //perform action to change the state 
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export default CartProvider
// export const useCart = () => useContext(CartDispatchContext)
// export const useDispatchCart = () => useContext(CartStateContext) 
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
