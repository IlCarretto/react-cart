import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState, { ProductSizePayload, PurchaseProductPayload, Sizes } from "./products";

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
            console.log(productIndex);
        },
        selectSize: (state, action: PayloadAction<ProductSizePayload>) => {
            const productToUpdate = state.find((product) => product.id === action.payload.product.id);
            if (productToUpdate) {
                productToUpdate.selectedSize = action.payload.size
            }
        },
        decreaseSizeQty: (state, action: PayloadAction<{productId: number, sizeSelected: string}>) => {
            const productIndex = state.findIndex(product => product.id === action.payload.productId);
            let selectedProduct = state[productIndex];
            const selectedSizeIndex = selectedProduct.sizes.findIndex(size => size.size === action.payload.sizeSelected);
            if (selectedProduct.sizes[selectedSizeIndex].qty > 0) {
                selectedProduct.sizes[selectedSizeIndex].qty -= 1;
            }
        },
        increaseSizeQty: (state, action: PayloadAction<{productId: number, sizeSelected: string}>) => {
            const productIndex = state.findIndex(product => product.id === action.payload.productId);
            let selectedProduct = state[productIndex];
            const selectedSizeIndex = selectedProduct.sizes.findIndex(size => size.size === action.payload.sizeSelected);
            selectedProduct.sizes[selectedSizeIndex].qty += 1;
        },
    }
})

export const {decreaseStock, increaseStock, selectSize, decreaseSizeQty, increaseSizeQty} = ProductSlice.actions;
