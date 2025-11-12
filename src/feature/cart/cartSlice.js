import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            debugger;
            const product = action.payload;
            // if (!product || !product.id) return;  // prevent crash
            const existingItems = state.cartItems.find(item => item.id === product.id);
            if (existingItems) {
                existingItems.quantity += 1;
            }
            else {
                state.cartItems.push({
                    ...product, quantity: 1
                })
            }
        },
        // Increase quantity
        increment: (state, action) => {
            debugger;
            const product = action.payload;
            const existingItems = state.cartItems.find(item => item.id === product.id);
            if (existingItems) {
                existingItems.quantity += 1;
            }

        },
        decriment: (state, action) => {
            const existingItems = state.cartItems.find(item => item.id === action.payload);
            if(existingItems && existingItems.quantity > 1)
            {
                existingItems.quantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
});

export const { addToCart, removeFromCart, clearCart, increment,decriment } = cartSlice.actions;
export default cartSlice.reducer;