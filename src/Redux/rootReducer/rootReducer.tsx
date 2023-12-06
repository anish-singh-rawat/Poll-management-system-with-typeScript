// import { combineReducers } from "@reduxjs/toolkit";
// import  signupSlice  from "../slice/signUp.tsx";
// import  loginSlice  from "../slice/login.tsx";
// import  pollSlice  from "../slice/userPoll.tsx";
// import  adminPollSlice  from "../slice/AdminPoll.tsx";
// import  listDataSlice  from "../slice/listData.tsx";
// import  deleteTitleSlice  from "../slice/DeleteTitle.tsx";
// import  deleteOptionSlice  from "../slice/deleteOption.tsx";
// import  editTitleSlice  from "../slice/EditTitle.tsx";
// import  addOptionSlice  from "../slice/AddOption.tsx";
// import  addVote  from "../slice/AddVote.tsx";

//  const rootReducer = combineReducers({
//     signupSlice : signupSlice,
//     loginSlice : loginSlice,
//     pollSlice : pollSlice,
//     adminPollSlice : adminPollSlice,
//     listDataSlice : listDataSlice,
//     deleteTitleSlice : deleteTitleSlice,
//     deleteOptionSlice : deleteOptionSlice,
//     editTitleSlice : editTitleSlice,
//     addOptionSlice : addOptionSlice,
//     addVote : addVote,
// })
// export default rootReducer

import { combineReducers } from "@reduxjs/toolkit";
import signupSlice from "../slice/signUp.tsx";
import loginSlice from "../slice/login.tsx";
import pollSlice from "../slice/userPoll.tsx";
import adminPollSlice from "../slice/AdminPoll.tsx";
import listDataSlice from "../slice/listData.tsx";
import deleteTitleSlice from "../slice/DeleteTitle.tsx";
import deleteOptionSlice from "../slice/deleteOption.tsx";
import editTitleSlice from "../slice/EditTitle.tsx";
import addOptionSlice from "../slice/AddOption.tsx";
import addVote from "../slice/AddVote.tsx";

const rootReducer = combineReducers({
    loginSlice: loginSlice,
    signupSlice: signupSlice,
  pollSlice: pollSlice,
  adminPollSlice: adminPollSlice,
  listDataSlice: listDataSlice,
  deleteTitleSlice: deleteTitleSlice,
  deleteOptionSlice: deleteOptionSlice,
  editTitleSlice: editTitleSlice,
  addOptionSlice: addOptionSlice,
  addVote: addVote,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
