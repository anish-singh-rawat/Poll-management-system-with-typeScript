import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import Instance from "../../utilities/axios.tsx";
import { AppDispatch } from "../store/store.tsx";


interface LoginState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: string[];
}

const initialState : LoginState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: [],
};

const deleteTitleSlice = createSlice({
  name: "deleteTitle",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action : PayloadAction<string[]>) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError(state, action : PayloadAction<string[]>) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = { ...action.payload };
    },
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = [];
    },
  },
});

export function DeleteTitle(payload : string) {
  return async (dispatch : AppDispatch) => {
    dispatch(deleteTitleSlice.actions.startLoading());
    try {
        const response = await Instance.delete(`delete_poll?id=${payload}`);
      dispatch(deleteTitleSlice.actions.loginSuccess(response.data));
    } catch (e) {
      dispatch(deleteTitleSlice.actions.hasError(e));
    }
  }
}

export const { startLoading, hasError, loginSuccess, resetReducer } 
= deleteTitleSlice.actions;
export default deleteTitleSlice.reducer;


