import { createSlice } from '@reduxjs/toolkit';



interface ISuccessSnackbar {
  isShow: boolean
}

const initialState: ISuccessSnackbar = {
    isShow: false
};


const successSnackbarSlice = createSlice({
  name: 'successSnackbar',
  initialState,
  reducers: {
    setShow(state) {
      state.isShow = !state.isShow;
    },
  },
});


export const {
    setShow,
} = successSnackbarSlice.actions;


export default successSnackbarSlice.reducer;
