import { React, useContext } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { useHistory, useNavigate } from "react-router-dom";
const apiKeyUpdateUser = process.env.GOOGLE_API_KEY;

const SubmitHandler = (user_id, token, props, navigate, authCtx) => (event) => {
  event.preventDefault();
  var new_email = document.getElementById("new_email").value;
  const user_update_mail_url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKeyUpdateUser}`;

  fetch(user_update_mail_url, {
    method: "POST",
    body: JSON.stringify({
      idToken: token,
      email: new_email,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = "Update failed";
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {})
    .catch((err) => {
      alert(err.message);
    });
  fetch("http://localhost:3000/usersPage/updateUserEmail", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: user_id,
      new_email: new_email,
    }),
  })
    .then((Response) => Response.json())
    .then((data) => {
      authCtx.logout();
      navigate("/login");
      console.log(data);
    })
    .catch((err) => console.log(err));
};

function UpdateUserPopup(props) {
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  console.log(props);

  return props.trigger ? (
    <div className="popup text-center">
      <div className="popup-inner">
        <Button
          variant="outlined"
          color="secondary"
          className="close-btn "
          onClick={() => props.setTrigger(false)}
        >
          {" "}
          X{" "}
        </Button>
        <div className="User_Info"></div>
        <label className="User_title">
          <u>{props.item.title}</u>
        </label>
        <br></br>

        <form
          onSubmit={SubmitHandler(
            props.item.id,
            authCtx.token,
            props,
            navigate,
            authCtx
          )}
        >
          <div className="payment_form_controls text-center">
            <br></br>
            <lable for="new_email">New Email</lable>
            <br></br>
            <br></br>
            <input type="text" id="new_email" name="new_email" required></input>
            <br></br>
            <br></br>
            <button
              type="submit"
              class="btn"
              className="update_email btn btn-dark"
            >
              Update Email
            </button>
            <br></br>
            <br></br>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}

export default UpdateUserPopup;
