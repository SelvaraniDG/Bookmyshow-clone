import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import '../components/common/Modal.css';

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return errors;
};

const SignUp = ({ onClose, openLoginModal }) => {
  const [values, setValues] = useState({ email: '', username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:8001/signup', values)
        .then(res => {
          onClose();
          openLoginModal();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-header">
        <h1 className="text-2xl font-bold">Sign Up</h1>
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleInput}
            placeholder="Enter your username"
          />
          {errors.username && <p className="auth-error">{errors.username}</p>}
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
        <button type="submit" className="auth-submit-btn">Sign Up</button>
        <p className="text-center mt-4">
          Already have an account? <button type="button" className="auth-link" onClick={openLoginModal}>Login</button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;