import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import signUp from '../../assets/signUp.png';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === confirmEmail) {
      if (password) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
          .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });
      } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
      }
    } else {
      setErrors(['Email addresses do not match']);
    }
  };

  const handleDemoSignup = () => {
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
      <div className="split-screen">
        <div className="left-side">
          <div className="SignupForm">
            <h1 className="signup-text">Create an account</h1>

            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error) => <li key={error}>{error}</li>)}
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
                  type="text"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  required
                  placeholder="Confirm email"
                />
              </label>
              <label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="First Name"
                />
              </label>
              <label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Last Name"
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
              <button type="submit">Create account</button>
              <button type="button" onClick={handleDemoSignup}>Sign up as demo user</button>
            </form>
          </div>
        </div>

        <div className="right-side">
          <img className="signup-image" src={signUp} alt="signup" />
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
