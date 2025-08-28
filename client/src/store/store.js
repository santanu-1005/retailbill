import {configureStore} from "@reduxjs/toolkit"
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import customersReducer from './slices/customersSlice'
import invoicesReducer from './slices/invoicesSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        customers: customersReducer,
        invoices: invoicesReducer,
        auth: authReducer,
    },
});

