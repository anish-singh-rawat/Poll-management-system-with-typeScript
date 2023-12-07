import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pollManage } from '../../Redux/slice/AdminPoll.tsx';
import './Admin.css';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteTitle } from '../../Redux/slice/DeleteTitle.tsx';
import { deleteOption } from '../../Redux/slice/deleteOption.tsx';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TablePagination } from '@mui/material';
import { AppDispatch } from '../../Redux/store/store.tsx';
import { RootState } from '../../Redux/rootReducer/rootReducer.tsx';

interface Option {
  option: string;
  vote: number;
}

interface PollData {
  _id: string;
  title: string;
  options: Option[];
}

const AdminPoll: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [deleteTitleId, setDeleteId] = useState<string | null>(null);
  const [optionData, setOptionData] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowPerPageOption, setRowPerPageOption] = useState<number[]>([5, 10, 15]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, updatedPage: number) =>
    setPage(updatedPage);

  const handleRowPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const row = (): number => {
    if (localStorage.getItem('rowpage')) {
      return JSON.parse(localStorage.getItem('rowpage')!);
    }
    return 5;
  };

  const [rowPerPage, setRowPerPage] = useState<number>(row());

  useEffect(() => {
    const storedPage = JSON.parse(localStorage.getItem('page')!);
    const storedRowPage = JSON.parse(localStorage.getItem('rowpage')!);

    if (storedPage && storedRowPage) {
      setPage(storedPage);
      setRowPerPage(storedRowPage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(page));
    localStorage.setItem('rowpage', JSON.stringify(rowPerPage));
  }, [page, rowPerPage]);

  const pollList = useSelector((state: any) => state.pollSlice.data);
  const deleteTitleLoading = useSelector((state: RootState) => state.deleteTitleSlice.isLoading);
  const deleteOptionLoading = useSelector((state: RootState) => state.deleteOptionSlice.isLoading);
  const editTitleSliceLoading = useSelector((state: RootState) => state.editTitleSlice.isLoading);
  const addOptionSliceLoading = useSelector((state: RootState) => state.addOptionSlice.isLoading);
  const listDataloading = useSelector((state: RootState) => state.listDataSlice.isLoading);
  const addVoteLoading = useSelector((state: RootState) => state.addVote.isLoading);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(pollManage());
  }, [deleteTitleLoading, editTitleSliceLoading, deleteOptionLoading, addOptionSliceLoading, listDataloading]);

  const logOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const deleteTitleData = (titleID: string) => {
    dispatch(DeleteTitle(titleID));
    setDeleteId(titleID);
  };

  const deleteOptionData = (optionInd: string, optionText: Option) => {
    dispatch(deleteOption(optionInd, optionText.option));
    setOptionData(optionText.option);
  };

  if (!pollList || addOptionSliceLoading || editTitleSliceLoading || listDataloading || addVoteLoading) {
    return (
      <h3>
        <center className="text-warning"> Loading... </center>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </h3>
    );
  }

  return (
    <>
      <ToastContainer />
      <center>
        <h2 className="text-light"> Welcome to Admin Page</h2>
        <div className="float-right text-danger mx-5" onClick={() => logOut()}>
          Logout
        </div>
      </center>

      <Link
        to={'/AddData'}
        className="d-flex justify-content-center align-item-center text-light"
        style={{
          fontSize: '22px',
          fontWeight: 'bold',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        AddPoll +
      </Link>

      <div className="container data-container mt-2" style={{ wordWrap: 'break-word' }}>
        <div className="row">
          <div className="col">
            {pollList.length > 0 &&
              pollList.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((dataList: PollData) => (
                <div key={dataList._id}>
                  <div className="card mt-3">
                    <div className="card-header bg-success text-light ">
                      <h5 className="card-title" style={{ wordWrap: 'break-word' }}>
                        {dataList.title}
                      </h5>
                      <div className="shift-right d-flex justify-content-around">
                        {dataList.options.length < 4 && (
                          <Link
                            to={`/AddOption/${dataList._id}`}
                            state={dataList.options}
                            className="fa-solid fa-plus text-white"
                            style={{ textDecoration: 'none' }}
                          ></Link>
                        )}
                        <Link
                          to={`/Editdata/${dataList._id}`}
                          state={dataList.title}
                          className="fa-regular fa-pen-to-square mx-5 text-light"
                        ></Link>
                        {dataList._id === deleteTitleId && deleteTitleLoading ? (
                          <CircularProgress color="inherit" />
                        ) : (
                          <i className="fa-solid fa-trash" onClick={() => deleteTitleData(dataList._id)}></i>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option: Option, ind: number) => (
                        <div
                          className="form-check mt-2 p-2"
                          key={ind}
                          style={{ borderBottom: '1px solid black' }}
                        >
                          <div className="d-flex justify-content-between">
                            <div className="text-sm text-md-lg text-lg-xl" style={{ wordWrap: 'break-word' }}>
                              {option.option}
                            </div>
                            <div className="icons d-flex">
                              <div className="vote-div mx-5">vote : {option.vote}</div>
                              {optionData === option.option && deleteOptionLoading ? (
                                <CircularProgress color="inherit" />
                              ) : (
                                <div className="fa-solid fa-trash"
                                  onClick={() => deleteOptionData(dataList._id, option)}
                                ></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      <div className="mt-2">
      <TablePagination
        style={{ display: 'flex', justifyContent: 'center', color: 'white' }}
        component="div"
        rowsPerPageOptions={rowPerPageOption}
        count={pollList.length}
        page={!pollList.length || pollList.length <= 0 ? 0 : page}
        rowsPerPage={rowPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowPerPageChange}/>
        </div>

    </>
  );
};

export default AdminPoll;
