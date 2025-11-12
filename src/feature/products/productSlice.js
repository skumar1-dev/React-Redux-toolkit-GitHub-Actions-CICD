import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    items: [],
    status: 'idle',
    error: null
}


export const fetchProducts = createAsyncThunk('products/getProducts',
    async () => {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        return data.products;
    });


const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "pending";
            state.error = null
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "success";
            state.items = action.payload;
        }).addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
});

export const { } = productSlice.actions;
export default productSlice.reducer;