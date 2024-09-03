// src/components/UserAuthForm/UserAuthForm.jsx
import React, { useState } from 'react';
import InputBox from './InputBox';
import { Link } from 'react-router-dom';
import AnimationWrapper from './AnimationWrapper';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const UserAuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setSuccess('');
  
    try {
      const response = type === "Sign-In"
        ? await axios.post('http://localhost:4000/api/user/login', data)
        : await axios.post('http://localhost:4000/api/user/register', data);
  
      if (response.data.success) {
        toast.success('Operation successful!');
        setSuccess('Operation successful!');
  
        const { token, refreshToken, role ,cartData} = response.data;
        dispatch({
          type: 'SET_TOKEN',
          payload: {
            token,
            role,
          }
        });
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
      } else {
        toast.error(response.data.message || 'Something went wrong');
        setError(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Error occurred. Please try again.');
      setError('Error occurred. Please try again.');
    }
  };
  
  

  return (
    <AnimationWrapper keyValue={type}>
      <section className='auth-section h-cover flex items-center justify-center mt-10'>
        <form className='w-[80%] max-w-[400px]' onSubmit={handleSubmit}>
          <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
            {type === "Sign-In" ? "Welcome back" : "Join us today"}
          </h1>
          {type !== "Sign-In" && (
            <InputBox
              name="name"
              type='text'
              placeholder="Full name"
              icon=""
              value={data.name}
              onChange={onChangeHandler}
            />
          )}
          <InputBox
            name="email"
            type='email'
            placeholder="Email"
            icon=""
            value={data.email}
            onChange={onChangeHandler}
          />
          <InputBox
            name="password"
            type='password'
            placeholder="Password"
            icon=""
            value={data.password}
            onChange={onChangeHandler}
          />
          <button className='btn-tmt center mt-14 mx-auto block' type='submit'>
            {type.replace("-", " ")}
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-center mt-4">{success}</p>}
          <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
            <hr className='w-1/2 border-black'/>
            <p>or</p>
            <hr className='w-1/2 border-black'/>
          </div>
          <button className='btn-tmt flex items-center justify-center gap-4 w-[100%] center'>
            <img className='w-5' src="" />
            Continue with Google
          </button>
          {type === "Sign-In" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?
              <Link to='/register' className='underline text-black text-xl ml-1'>
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already have an account?
              <Link to='/login' className='underline text-black text-xl ml-1'>
                Sign in here.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
