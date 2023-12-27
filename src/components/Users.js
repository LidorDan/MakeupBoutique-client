import React, { useEffect, useState } from "react";
import "../styles/ProductPopup.css";
// import ProductPopup from "./ProductPopup";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import NavBar from "../components/NavBar";
import "../styles/ProductsPage.css";
import "../styles/Product.css";
import { Container} from "react-bootstrap";
import Footer from "../components/Footer";
import User from "../components/User";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/usersPage")
      .then((Response) => Response.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
        {users.map((user) => (
          <User
            id={user._id}
            email={user.email}
            password={user.password}
            first_name={user.first_name}
            last_name={user.last_name}
            id_token={user.id_token}
            is_single ={false}
          ></User>
        ))}
    </>
  );
};

export default UsersPage;
