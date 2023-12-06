import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from '../component/login/Login.tsx'
import SignUp from '../component/signup/SignUp.tsx'
import AdminPoll from '../page/Admins/AdminPoll.tsx'
import UsersPoll from '../page/Users/UsersPoll.tsx'
import AddData from '../page/AddData/AddData.tsx'
import EditData from '../page/EditData/EditData.tsx'
import Option from '../page/AddOption/Option.tsx'
import { useSelector } from 'react-redux'
import PrivateRoute from './PrivateRoute.tsx'
import { RootState } from '../Redux/rootReducer/rootReducer.tsx'

// export default function Router() {

//   const loginSlice = useSelector((state : RootState) => state.loginSlice);
//   const Navigate = useNavigate()

//   useEffect(() => {
//     localStorage.getItem("token");
//     localStorage.getItem("role");
//   }, [loginSlice.isSuccess]);

//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem("role");
//   const isToken = role && token ? true : false ;

//   useEffect(()=>{
//     Navigate('/')
//   },[isToken])

//   return (
//     <Routes>
      
//       { isToken &&  <Route path='/' element={role.toLowerCase() === "admin" ?  
//       <AdminPoll /> : <UsersPoll /> } /> }

//       <Route path='/' element={<Login />}></Route>

//       <R path="/adminPoll" element={<PrivateRoute login={(localStorage.getItem("token") && localStorage.getItem("role") === "admin")}>  <AdminPoll /></PrivateRoute>}>
//       </Route>

//       <R path="/userPoll" element={<PrivateRoute login={(localStorage.getItem("token") && localStorage.getItem("role") === "guest")}>  <UsersPoll /></PrivateRoute>}>
//       </Route>

//       <Route path='/signup' element={<SignUp />}> </Route>
//       {/* <Route path='/login' element={<Login />}> </Route> */}
//       <Route path='/AddData' element={<AddData />} > </Route>
//       <Route path='/Editdata/:editDataId' element={<EditData />}> </Route>
//       <Route path='/AddOption/:optionDataId' element={<Option />}> </Route>

//     </Routes>
//   )
// }


interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const loginSlice = useSelector((state: RootState) => state.loginSlice);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('token');
    localStorage.getItem('role');
  }, [loginSlice.isSuccess]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isToken = role && token ? true : false;

  useEffect(() => {
    navigate('/');
  }, [isToken]);

  return (
    <Routes>
      {isToken && (
        <Route
          path='/'
          element={
            role.toLowerCase() === 'admin' ? <AdminPoll /> : <UsersPoll />
          }
        />
      )}

      <Route path='/' element={<Login />} />
      <Route
        path='/adminPoll'
        element={
          <PrivateRoute
            login={
              localStorage.getItem('token') &&
              localStorage.getItem('role') === 'admin'
            }
          >
            <AdminPoll />
          </PrivateRoute>
        }
      />
      <Route
        path='/userPoll'
        element={
          <PrivateRoute
            login={
              localStorage.getItem('token') &&
              localStorage.getItem('role') === 'guest'
            }
          >
            <UsersPoll />
          </PrivateRoute>
        }
      />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/AddData' element={<AddData />} />
      <Route path='/Editdata/:editDataId' element={<EditData />} />
      <Route path='/AddOption/:optionDataId' element={<Option />} />
    </Routes>
  );
};

export default Router;