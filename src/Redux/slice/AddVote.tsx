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


const addVote = createSlice({
  name: "addVote",
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

export function VoteData(VoteId : string, VoteOptionText : string, header : any) {
  return async (dispatch : AppDispatch) => {
    dispatch(addVote.actions.startLoading());
    try {
      const response = await Instance.get(`do_vote?id=${VoteId}&option_text=${VoteOptionText}`, header);
      dispatch(addVote.actions.loginSuccess(response.data));
    } catch (error) {
      dispatch(addVote.actions.hasError(error));
    }
  }
}

export const { startLoading, hasError, loginSuccess, resetReducer }
  = addVote.actions;
export default addVote.reducer;


