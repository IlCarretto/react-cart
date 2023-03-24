import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ProductSlice } from "./products/productSlice";
import { cartSlice } from "./Cart/cartSlice";

export const store = configureStore({
    reducer: {
        products:ProductSlice.reducer,
        cart:cartSlice.reducer
    }
})

export const useAppDispatch:()=>typeof store.dispatch = useDispatch;
export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

