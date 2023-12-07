import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Instance from "../../utilities/axios.tsx";
import { AppDispatch } from "../store/store.tsx";

interface PollState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: string[]; 
}
interface GetSuccessInter {
  data: string[];
}

const initialState: PollState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: [],
};

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    getSuccess(state, action:PayloadAction<GetSuccessInter>) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload.data.reverse();
    },
    hasError(state, action:PayloadAction<string[]>) {
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

export const pollManage = () => async (dispatch: AppDispatch) => {
  dispatch(pollSlice.actions.startLoading());
  try {
    const response = await Instance.post("list_polls");
    dispatch(pollSlice.actions.getSuccess(response.data));
  } catch (error) {
    dispatch(pollSlice.actions.hasError(error));
  }
};

export const { startLoading, hasError, getSuccess, resetReducer } = pollSlice.actions;
export default pollSlice.reducer;
