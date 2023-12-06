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
  
const deleteOptionSlice = createSlice({
    name: "deleteOption",
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

export function deleteOption(optionInd : string, optionText : string) {
    return async (dispatch : AppDispatch) => {
        dispatch(deleteOptionSlice.actions.startLoading());
        try {
            const response = await Instance.delete(`delete_poll_option?id=${optionInd}&option_text=${optionText}`);
            dispatch(deleteOptionSlice.actions.loginSuccess(response.data));

        } catch (e) {
            dispatch(deleteOptionSlice.actions.hasError(e));
            console.log('errr');
        }
    }
}

export const { startLoading, hasError, loginSuccess, resetReducer }
    = deleteOptionSlice.actions;
export default deleteOptionSlice.reducer;


