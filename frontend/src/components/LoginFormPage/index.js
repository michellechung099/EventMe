import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import logIn from '../../assets/logIn.png';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if there is a current session user in Redux store, redirect the user to the / path if trying to access the LoginFormPage
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // dispatch login thunk action with form input values
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <>
      <div className="split-screen">
        <div className="left-side">
          <div className="login-form">
            <h1 className="login-text">Log In</h1>

            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
              </ul>
              <label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </label>
              <label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </label>
              <button type="submit">Log In</button>
            </form>
          </div>
        </div>

        <div className="right-side">
          <img className="background-image" src={logIn} alt="background" />
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
