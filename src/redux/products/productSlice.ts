import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./products";
import { Product } from "./products";

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
        }
    }
})

export const {decreaseStock, increaseStock} = ProductSlice.actions;
