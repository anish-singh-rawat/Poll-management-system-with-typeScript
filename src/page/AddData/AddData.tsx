import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { listData, resetReducer } from '../../Redux/slice/listData.tsx';
import { AppDispatch } from '../../Redux/store/store.tsx';
import { RootState } from '../../Redux/rootReducer/rootReducer.tsx';

interface Option {
  option: string;
}

const AddData: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [newOptions, setNewOptions] = useState<Option[]>([{ option: '' }]);
  const navigate = useNavigate();

  const listDataLoading = useSelector((state: RootState) => state.listDataSlice.isLoading);

  const hasDuplicates = (options: Option[]) => {
    const valuesSet = new Set(options.map((item) => item.option.trim()));
    return options.length !== valuesSet.size;
  };

  const formikData = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: (values) => {
      try {
        if (values.title.trim() !== '') {
          if (newOptions[0].option.trim() !== '') {
            if (hasDuplicates(newOptions)) {
              toast.error('Options cannot be the same');
              return;
            }

            dispatch(listData(values, newOptions));
            setTimeout(() => {
              navigate('/adminpoll');
            }, 200);
          } else {
            toast.warning('Please enter Options');
          }
        } else {
          dispatch(resetReducer());
          toast.warning('Please enter a title or Options');
        }
      } catch (error) {}
    },
  });

  const increaseLength = () => {
    if (newOptions.length < 4) {
      setNewOptions([...newOptions, { option: '' }]);
    } else {
      toast.error('Only four options are allowed');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    const updatedOptions = [...newOptions];
    updatedOptions[index][name] = value;
    setNewOptions(updatedOptions);
  };

  return (
    <div>
      <ToastContainer />
      <center>
        <h2 className="text-light mt-4"> Add Data here </h2>
      </center>
      <form className="input-form mt-3" onSubmit={formikData.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            className="form-control mt-2"
            value={formikData.values.title}
            name="title"
            onChange={formikData.handleChange}
            placeholder="Enter message title"
          />

          {formikData.errors.title && <p className="text-danger">{formikData.errors.title}</p>}
        </div>
        {newOptions.map((items, index) => (
          <div className="form-group mt-3" key={index}>
            <label>Option {index + 1}</label>
            <input
              type="text"
              className="form-control mt-2"
              name="option"
              value={items.option}
              placeholder={`Option ${index + 1}`}
              onChange={(event) => handleChange(event, index)}
            />
          </div>
        ))}
        <div className="add-option mt-4">
          <h2 onClick={increaseLength}>+</h2>
        </div>
        <div className="d-flex justify-content-between mt-4">
          {listDataLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          )}

          <Link to={'/adminPoll'} className="btn btn-danger">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddData;
