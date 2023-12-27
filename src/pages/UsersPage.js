import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

/*components */
import UserList from "../components/UserList";
import NavBar from "../components/NavBar";
import FilterPanel from "../components/FilterPanel";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

/* styles */
import "../styles/ProductsPage.css";
import "../styles/Product.css";
import "../styles/UsersPage.css";


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
      <NavBar></NavBar>
      <div className="users_page">
        <u className="title_users">
          <h2>Users list</h2>
        </u>
        <div className="users_page-wrap">
          <UserList users={users} />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default UsersPage;
