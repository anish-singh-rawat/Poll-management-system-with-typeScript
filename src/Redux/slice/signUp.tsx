import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import Instance from "../../utilities/axios.tsx";
import { AppDispatch } from "../store/store.tsx";


interface SignUpState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: string[];
}

const initialState : SignUpState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: [],
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action : PayloadAction<string[]> ) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload  };
    },
    hasError(state, action : PayloadAction<string[]>) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = { ...action.payload  };
    },
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = [];
    },
  },
});

export function signup(payload : {username : string, userpassword : string, role : string}) {
  return async (dispatch : AppDispatch) => {

    dispatch(signupSlice.actions.startLoading());

    try {
      const response = await
        Instance.post(`add_user?username=${payload.username}&password=${payload.userpassword}&role=${payload.role}`);
      dispatch(signupSlice.actions.loginSuccess(response.data));
    } catch (e) {
      dispatch(signupSlice.actions.hasError(e));
    }
  }
}

export const { startLoading, hasError, loginSuccess, resetReducer } = signupSlice.actions;
export default signupSlice.reducer;