import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState, { ProductSizePayload } from "./products";

// Creo lo slice di Product
export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        decreaseStock: (state, action: PayloadAction<number>) => {
            const productIndex = state.findIndex(product => product.id === action.payload);
            state[productIndex].itemsInStock--;
        },
        increaseStock: (state, action: PayloadAction<number>) => {
            const productIndex = state.findIndex(product => product.id === action.payload);
            state[productIndex].itemsInStock++;
        },
        selectSize: (state, action: PayloadAction<ProductSizePayload>) => {
            const productToUpdate = state.find((product) => product.id === action.payload.product.id);
            if (productToUpdate) {
                productToUpdate.selectedSize = action.payload.size
            }
        }
    }
})

export const {decreaseStock, increaseStock, selectSize} = ProductSlice.actions;
