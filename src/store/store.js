import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../feature/tasks/taskSlice'
import productReducer from '../feature/products/productSlice'
import cartReducer from '../feature/cart/cartSlice'

const store = configureStore({
    reducer: {
        task: taskReducer,
        products: productReducer, // key name 'products' matches the slice name
        cart: cartReducer
    }
})
export default store;