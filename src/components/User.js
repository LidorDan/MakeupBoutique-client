import "../styles/ProductPopup.css";
import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { RiMapPin2Line, RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import UpdateUserPopup from "./UpdateUserPopup";
import { useHistory, useNavigate } from "react-router-dom";

function User(user) {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [updateButtonPopup, setUpdateButtonPopup] = useState(false);
  const apiKeyDelete = process.env.GOOGLE_API_KEY;

  console.log(user);
  //const [userToken, setuserToken] = useState(user.user_name);

  const deleteUserHandler = (event) => {
    //event.preventDefault();
    console.log("** in deleteUserHandler deleteUser **");
    console.log(user);
    console.log(user.email);
    console.log(authCtx.token);

    fetch("http://localhost:3000/usersPage/deleteUser", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email_to_delete: user.email,
      }),
    });

    authCtx.logout();
    navigate("/");

    const delete_url = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKeyDelete}`;

    fetch(delete_url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Deleted Successfully");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Delete failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container>
      <Card
        style={{ width: "17rem", marginLeft: "0.8rem" }}
        className="text-center"
      >
        {user.is_single && (
          <div>
            <RiDeleteBin2Line
              className="delete_icon"
              onClick={() => deleteUserHandler(user.id)}
            />
            <RiEdit2Line
              className="edit_icon"
              onClick={() => setUpdateButtonPopup(true)}
            />
          </div>
        )}

        <Card.Img
          className="product_img"
          height={180}
          src={"/Images/User/customer1.png"}
          onClick={(event, prod) => setButtonPopup(true)}
        />
        <Card.Body>
          <Card.Title>
            {user.user_name}{" "}
            {/* <FavoriteIcon onClick={addToWishListHandler}></FavoriteIcon> */}
          </Card.Title>
          <Card.Text>First Name: {user.first_name}&nbsp;</Card.Text>
          <Card.Text>Last Name: {user.last_name}&nbsp;</Card.Text>
          <Card.Text>Email: {user.email}&nbsp;</Card.Text>
        </Card.Body>
      </Card>
      <UpdateUserPopup
        class="update_user_popup"
        trigger={updateButtonPopup}
        setTrigger={setUpdateButtonPopup}
        item={user}
      ></UpdateUserPopup>
    </Container>
  );
}
export default User;
