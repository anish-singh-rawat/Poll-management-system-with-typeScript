import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import Instance from "../../utilities/axios.tsx";
import { AppDispatch } from "../store/store.tsx";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};
const listDataSlice = createSlice({
  name: "listDataSlice",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state,  action: PayloadAction<any>) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError(state,  action: PayloadAction<any>) {
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

export  function listData(payload : {title : string}, newOptions : any) {
  return async (dispatch : AppDispatch) => {
    dispatch(listDataSlice.actions.startLoading());

    try {
        if (newOptions.length === 1) {
          const response =  Instance.post(`add_poll?title=${payload.title}&options=${newOptions[0].option}`);
          dispatch(listDataSlice.actions.loginSuccess(response));
        }
        
        else if (newOptions.length === 2) {
          const response =  Instance.post(`add_poll?title=${payload.title}&options=${newOptions[0].option}____${newOptions[1].option}`);
          dispatch(listDataSlice.actions.loginSuccess(response));
        }

        else if (newOptions.length === 3) {
          const response =  Instance.post(`add_poll?title=${payload.title}&options=${newOptions[0].option}____${newOptions[1].option}____${newOptions[2].option}`);
          dispatch(listDataSlice.actions.loginSuccess(response));
        }

        else if (newOptions.length === 4) {
          const response =  Instance.post(`add_poll?title=${payload.title}&options=${newOptions[0].option}____${newOptions[1].option}____${newOptions[2].option}____${newOptions[3].option}`);
          dispatch(listDataSlice.actions.loginSuccess(response));
        }
      
    } catch (e) {
      dispatch(listDataSlice.actions.hasError(e));
    }
  }
}


export const { startLoading, hasError, loginSuccess, resetReducer } 
= listDataSlice.actions;
export default listDataSlice.reducer;


