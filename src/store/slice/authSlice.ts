import { PayloadAction, createSlice } from '@reduxjs/toolkit';



interface IAuth {
    username: string 
    isAuthenticated: boolean
}

const initialState: IAuth = {
    username: "",
    isAuthenticated: false
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },

    setUserName(state, action: PayloadAction<string>) {
        state.username = action.payload
    }

  },
});


export const {
    setIsAuthenticated,
    setUserName
} = authSlice.actions;


export default authSlice.reducer;
