import { createSlice } from "@reduxjs/toolkit";
import { getStogare } from "../../api/localStorage";


export const userEmptyState = {
  nombre: "",
  idUsuario: "",
  token: "",
  isAdmin: "",
  pais: "",
  isEncrypt: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: getStogare('auth') ?? userEmptyState,
  reducers: {
    createUser: (state, action)=>action.payload,
    modifyUser: (state,action)=>({...state,...action.payload}),
    resetUser: ()=> userEmptyState,
  },
});

export const {createUser,modifyUser,resetUser } = userSlice.actions;

export default userSlice.reducer;