import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import StoresPage from "./pages/StoresPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProductsPage from "./pages/ProductsPage";
import ShoppingBagPage from "./pages/ShoppingBagPage";
// import SubmitBtn from "./components/SubmitBtn";
import WishListPage from "./pages/WishListPage";
import {AuthPage, LogOutP} from "./pages/loginPage";
import OrdersPage from "./pages/OrdersPage";
import UsersPage from "./pages/UsersPage";
import { AuthContextProvider } from "./store/auth-context";
import { useContext, useRef } from "react";
import AuthContext from "./store/auth-context";
import PageNotFound from "./pages/PageNotFound";
function App() {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const isLoggedin = authCtx.isLoggedin;
  console.log(isAdmin);
  console.log(typeof isLoggedin);
  return (
    <Routes>
      <Route>
        <Route exact path="/" element={<HomePage />}></Route>
        {isLoggedin === "true" ? (
          <Route
            exact
            path="/userProfile"
            element={<UserProfilePage />}
          ></Route>)
 : (
          <Route
            exact
            path="/userProfile"
            element={<PageNotFound message={"Log in is required"} />}
          ></Route>
        )}
        <Route exact path="/productsPage" element={<ProductsPage />}></Route>
        (<Route
          exact
          path="/logout"
          element={<LogOutP />}
        ></Route>
        )
        {isLoggedin === "true" ? (
          <Route exact path="/wishList" element={<WishListPage />}></Route>
        ) : (
          <Route
            exact
            path="/wishList"
            element={<PageNotFound message={"Log in is required"} />}
          ></Route>
        )}
        <Route exact path="/login" element={<AuthPage />}></Route>
        {isAdmin === "true" ? (
          <Route exact path="/users" element={<UsersPage />}></Route>
        ) : (
          <Route
            exact
            path="/users"
            element={<PageNotFound message={"This page in for admin!"} />}
          ></Route>
        )}
        {isAdmin === "true" ? (
          <Route exact path="/OrdersPage" element={<OrdersPage />}></Route>
        ) : (
          <Route
            exact
            path="/OrdersPage"
            element={<PageNotFound message={"This page in for admin!"} />}
          ></Route>
        )}
        <Route exact path="/stores" element={<StoresPage />}></Route>
        {isLoggedin === "true" ? (
          <Route
            exact
            path="/shoppingBag"
            element={
              <>
                <ShoppingBagPage />
              </>
            }
          ></Route>
        ) : (
          <Route
            exact
            path="/shoppingBag"
            element={<PageNotFound message={"Log in is required"} />}
          ></Route>
        )}
      </Route>
      <Route
        exact
        path="*"
        element={<PageNotFound message={"Page not found"} />}
      ></Route>
    </Routes>
    
  );
}

export default App;
