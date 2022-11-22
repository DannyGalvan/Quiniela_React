import {configureStore} from '@reduxjs/toolkit';
import { userSlice } from './state/user';

export default configureStore({
    reducer:{
        user: userSlice.reducer,
    }
})
