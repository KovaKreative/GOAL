import React, { useState } from 'react';

const Login = (props) => {
  const [users, setUsers] = useState();
  const onSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    props.onLogin(email, password);
  };
  return (
    <form onSubmit={onSubmit}>
      <label className="form__label" htmlFor="email">
        Email
      </label>
      <input
        name="email"
        type="email"
      />

      <label className="form__label" htmlFor="password">
        Password
      </label>
      <input
        name="password"
        type="password"
      />

      <div className="footer">
        <button type="submit" className="btn">
          Log In
        </button>
      </div>
    </form>
  );
};

export default Login;