import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pollManage } from "../../Redux/slice/AdminPoll.tsx";
import { useNavigate } from "react-router-dom";
import { VoteData } from "../../Redux/slice/AddVote.tsx";
import { Backdrop, CircularProgress, TablePagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../../Redux/store/store.tsx";
import { RootState } from "../../Redux/rootReducer/rootReducer.tsx";

interface Option {
  option: string;
}

interface Poll {
  _id: string;
  title: string;
  options: Option[];
}

const UsersPoll: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

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


  const [disabledOptions, setDisabledOptions] = useState<{
    [key: string]: boolean;
  }>({});
  const pollList = useSelector((state: any) => state.pollSlice.data) as Poll[];
  const pollListLoading = useSelector(
    (state: RootState) => state.pollSlice.isLoading
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedDisabledOptions = JSON.parse(
      localStorage.getItem("disabledOptions") || "{}"
    );
    setDisabledOptions(storedDisabledOptions);
  }, []);

  useEffect(() => {
    localStorage.setItem("disabledOptions", JSON.stringify(disabledOptions));
  }, [disabledOptions]);

  const header = {
    headers: {
      access_token: token,
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(pollManage());
  }, []);

  const logOut = () => {
    navigate("/");
    localStorage.clear();
  };

  const inputVoteChange = (
    title: string,
    OptionId: string,
    OptionData: string
  ) => {
    dispatch(VoteData(OptionId, OptionData, header));
    setDisabledOptions((prevOptions) => ({
      ...prevOptions,
      [title]: true,
    }));
    toast.success("Your Vote has been deployed");
  };

  if (!pollList || pollListLoading) {
    return (
      <h3>
        <center className="text-warning"> Loading... </center>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </h3>
    );
  }

  return (
    <>
      <ToastContainer />

      <center>
        <h2 className="text-light"> welcome to User Poll</h2>
        <div className="float-right text-danger mx-5" onClick={() => logOut()}>
          Logout
        </div>
      </center>

      <div className="container data-container"
        style={{ wordBreak: "break-word" }} >
        <div className="row">
          <div className="col">
            {pollList.length > 0 &&
              pollList.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((dataList) => (
                <div className="card my-3" key={dataList._id}>
                  <div>
                    <div className="card-header bg-success">
                      <h5 className="card-title">{dataList.title}</h5>
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option, index) => (
                        <div className="form-check" key={index}>
                          <input
                            className="form-check-input input-radio-btn"
                            type="radio"
                            name={`radio-${dataList._id}`}
                            id={`${index}`}
                            onChange={() =>
                              inputVoteChange(
                                dataList.title,
                                dataList._id,
                                option.option
                              )
                            }
                            disabled={disabledOptions[dataList.title]}
                          />
                          <label
                            className="form-check-label mx-2"
                            htmlFor={`radio-${dataList._id}-${index}`}
                          >
                            <div className="text-sm text-md-lg text-lg-xl">
                              {option.option}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4">
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

export default UsersPoll;
