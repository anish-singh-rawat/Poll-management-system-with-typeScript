import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import Instance from "../../utilities/axios.tsx";
import { AppDispatch } from "../store/store.tsx";


interface LoginState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: Record<string , unknown>;
}

const initialState : LoginState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const editTitleSlice = createSlice({
  name: "editTitle",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action : PayloadAction<any>) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError(state, action : PayloadAction<any>) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = { ...action.payload };
    },
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export function EditTitle(titleId : string, titleData : string) {
  return async (dispatch : AppDispatch) => {
    dispatch(editTitleSlice.actions.startLoading());
    try {
      const response = await Instance.delete(`update_poll_title?id=${titleId}&title=${titleData}`);
      dispatch(editTitleSlice.actions.loginSuccess(response.data));
      
    } catch (error) {
      dispatch(editTitleSlice.actions.hasError(error));
    }
  }
}

export const { startLoading, hasError, loginSuccess, resetReducer }
  = editTitleSlice.actions;
export default editTitleSlice.reducer;


