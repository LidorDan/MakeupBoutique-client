import { useState, useRef, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useHistory, useNavigate } from "react-router-dom";

import classes from "../styles/Login.module.css";

export const LogOut = () => {
  const authCtx = useContext(AuthContext);

  let navigate = useNavigate();
  authCtx.logout();

  navigate("/");
};

export const AuthForm = () => {
  let navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const isAdminInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [mongoId, setMongoId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.GOOGLE_API_KEY;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredFirstName;
    let enteredLasttName;
    let enteredIsAdmin;

    if (!isLogin) {
      enteredFirstName = firstNameInputRef.current.value;
      enteredLasttName = lastNameInputRef.current.value;
      enteredIsAdmin = isAdminInputRef.current.checked;
    }

    setIsLoading(true);

    let url;
    let mon, is_ad;

    if (isLogin) {
      console.log(enteredEmail);

      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

      fetch("http://localhost:3000/usersPage/getUserByEmail", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredEmail,
        }),
      })
        .then((Response) => Response.json())
        .then((data) => {
          console.log(data._id);
          console.log(data.is_admin);
        });

      fetch("http://localhost:3000/usersPage/getUserByEmail", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredEmail,
        }),
      })
        .then((Response) => Response.json())
        .then((data) => {
          console.log(data._id);
          console.log(data.is_admin);

          setMongoId(data._id);
          setIsAdmin(data.is_admin);
          mon = data._id;
          is_ad = data.is_admin;
        })
        .catch((err) => console.log(err));

      console.log(isAdmin);
      console.log(mongoId);
    } else {
      console.log("******");

      fetch("http://localhost:3000/usersPage/addUser", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredEmail,
          first_name: enteredFirstName,
          last_name: enteredLasttName,
          is_admin: enteredIsAdmin,
        }),
      })
        .then((Response) => Response.json())
        .catch((err) => console.log(err));

      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    }

    console.log("fetch fb");
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Auth failed";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.idToken);
        console.log(mongoId);
        console.log(mon);
        if (isLogin) {
          authCtx.login(data.idToken, mon, is_ad);
          navigate("/userProfile");
        } else {
          setIsLogin(!isLogin);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div>
            <div className={classes.control}>
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                required
                ref={firstNameInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                required
                ref={lastNameInputRef}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="is_admin"
                ref={isAdminInputRef}
                //checked={isAdmin}
                // onChange={() => setIsAdmin(!isAdmin)}
              />
              <label htmlFor="toggle">&nbsp;Is Admin</label>
            </div>
          </div>
        )}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p> Loading ... </p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};
