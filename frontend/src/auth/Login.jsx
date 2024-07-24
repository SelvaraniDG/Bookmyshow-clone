import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/authSlice';
import '../components/common/Modal.css';

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 5) {
    errors.password = 'Password must be at least 5 characters long';
  }

  return errors;
};

const Login = ({ onClose, openSignUpModal }) => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8001/login', values);

        if (response.data.success) {
          const user = {
            email: values.email,
            user_id: response.data.user_id
          };
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(authActions.login());
          navigate('/');
          onClose(); // Close the modal on successful login
        } else {
          setErrors({ api: response.data.message || 'An error occurred. Please try again.' });
        }
      } catch (error) {
        console.log(error);
        setErrors({ api: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-header">
        <h1 className="text-2xl font-bold">Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="auth-form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleInput}
            placeholder="Enter your email"
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}
        </div>
        <div className="auth-form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleInput}
            placeholder="Enter your password"
          />
          {errors.password && <p className="auth-error">{errors.password}</p>}
        </div>
        {errors.api && <p className="auth-error">{errors.api}</p>}
        <button type="submit" className="auth-submit-btn">Login</button>
        <p className="text-center mt-4">
          Don't have an account? <button type="button" className="auth-link" onClick={openSignUpModal}>Sign up</button>
        </p>
      </form>
    </div>
  );
};

export default Login;