import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useRef } from "react";
import AuthContext from "../store/auth-context";

/*components */
import User from "../components/User";
import NavBar from "../components/NavBar";
import FilterPanel from "../components/FilterPanel";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

/* styles */
import "../styles/ProductsPage.css";
import "../styles/Product.css";

const UsersPage = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/usersPage/getUserById", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: authCtx.userId,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="users_page">
        <div className="users_page_panelList-wrap">
          {user && (
            <User
              id={user._id}
              first_name={user.first_name}
              last_name={user.last_name}
              email={user.email}
              is_single={true}
              setUser={setUser}
            ></User>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default UsersPage;
