import assert from "assert";
import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { AppContext } from "../App";
import { useHistory } from "react-router-dom";
import { ErrorPresenter } from "../ErrorPresenter/ErrorPresenter";

export const LoginPage = props => {
  let email: HTMLInputElement;
  let password: HTMLInputElement;

  const history = useHistory();

  const [failedLogin, setFailedLogin] = useState(false);

  const { f } = useContext(AppContext);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    f.login(email.value, password.value)
      .then(res => {
        assert(res, "Login failure.");
        history.push("/products");
        setFailedLogin(false);
      })
      .catch(err => {
        console.error(err);
        setFailedLogin(true);
      });
  };

  return (
    <div className="LoginPage">
      <div className="container">
        <div className="prompt">Please log in.</div>
        <form onSubmit={e => submit(e)}>
          <div className="inputs">
            <label htmlFor="un">Username</label>
            <input
              id="un"
              ref={r => (email = r)}
              placeholder="username@domain.com"
            />
            <label htmlFor="pw">Password</label>
            <input
              id="pw"
              type="password"
              ref={r => (password = r)}
              placeholder="password"
            />
          </div>
          <div className="buttons">
            <button className="login" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <ErrorPresenter
          show={failedLogin}
          msg="Error logging in.  Please try again"
        />
      </div>
    </div>
  );
};
