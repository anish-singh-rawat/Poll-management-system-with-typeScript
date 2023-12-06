import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store/store.tsx";
import Instance from "../../utilities/axios.tsx";

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

 const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action : PayloadAction) {
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

export function login(payload : {username : string, userpassword : string}) {
 return async (dispatch : AppDispatch) => {
   dispatch(loginSlice.actions.startLoading());
    try {
      const response = await  Instance.post(`login?username=${payload.username}&password=${payload.userpassword}`, { payload });
      dispatch(loginSlice.actions.loginSuccess(response.data));
    } catch (e) {
     dispatch(loginSlice.actions.hasError(e));
    }
  }
}

export const { startLoading, hasError, loginSuccess, resetReducer } = loginSlice.actions;
export default loginSlice.reducer;