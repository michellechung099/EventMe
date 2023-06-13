import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import logIn from '../../assets/logIn.png';
import { NavLink } from "react-router-dom";

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

  const handleDemoLogIn = () => {
    const demoUser = {
      email: "demo@user.io",
      firstName: "demo",
      lastName: "user",
      password: "password",
    };
    // Dispatch the login action with the demo user credentials
    return dispatch(sessionActions.login(demoUser));
  };

  return (
    <>
      <div className="login-form-split-screen">
        <div className="login-form-left-side">
          <div className="login-form-container">
            <div className="login-form-header">
              <NavLink exact to="/">
                <h1 className="login-form-logo">eventme</h1>
              </NavLink>
              <div className="login-text-and-links">
                <h1 className="login-text">Log in</h1>
                <NavLink className="login-header-signup-link" exact to="/signup">
                  Sign up
                </NavLink>
              </div>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
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
              <button type="button" onClick={handleDemoLogIn}>Log In as demo user</button>
            </form>
          </div>
        </div>

        <div className="login-form-right-side">
          <img className="login-background-image" src={logIn} alt="background" />
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
