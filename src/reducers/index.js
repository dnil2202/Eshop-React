/// imit store
import {configureStore, applyMiddleware} from '@reduxjs/toolkit'
import {userReducer} from './userReducer'
import reduxThunk from 'redux-thunk'

export const rootStore = configureStore({
    // Untuk Mengelompokan semua reducer yang telah dibuat
    reducer:{
        userReducer

    }
},applyMiddleware(reduxThunk))