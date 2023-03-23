import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../products/products";
import { store } from "../store";

// Estendo l'interfaccia di Product per il Cart, aggiungendo la quantità di tipi singoli scelti
interface CartProduct extends Product {
    qty: number;
}

// Creo i reducers di Cart
export const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as CartProduct[],
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const productIndex = state.findIndex(product => product.id === action.payload.id);
            if (productIndex !== -1) {
                state[productIndex].qty += 1;
            } else {
                state.push({...action.payload, qty: 1})
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const productIndex = state.findIndex(product => product.id === action.payload);
            if (state[productIndex].qty > 1) {
                state[productIndex].qty -= 1;
            } else {
                return state.filter(product => product.id !== action.payload);
            }
        },
        // totalItems: ()
    }
})

export type RootState = ReturnType<typeof store.getState>
// Prodotti attuali del carrello
export const getCartProducts = (state: RootState) => state.cart;

// "Metodo" che prende i prodotti inseriti nel carrello e attraverso reduce che vuole parametri totale (accumulatore) e item (next) fa il totale ciclando il risultato tra quantità x prezzo di ogni prodotto, partendo da 0
export const getTotalPrice = (state: RootState) => state.cart.reduce((total, item) => total +=(item.qty * item.price), 0);

export const getTotalItems = (state: RootState) => state.cart.reduce((total, item) => total + item.qty, 0);

// Esporto i reducers
export const {addToCart, removeFromCart} = cartSlice.actions;

