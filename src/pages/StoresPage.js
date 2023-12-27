import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
/*components */
import StoreList from "../components/StoresList";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AddNewStore from "../components/AddNewStore";
import AuthContext from "../store/auth-context";

/* styles */
import "../styles/ProductsPage.css";
import "../styles/Product.css";
import "../styles/StoresPage.css";
import MyMap from "../components/MyMap";

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;

  useEffect(() => {
    fetch("http://localhost:3000/storesPage")
      .then((Response) => Response.json())
      .then((data) => setStores(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="stores_page">
        <u className="title_stores">
          <h2>Our Stores</h2>
        </u>

        <div className="stores_page-wrap">
          <StoreList stores={stores} setStores={setStores} />
        </div>
        <div className="add_new_store">
          <div className="add_new_store-btn">
            {isAdmin === "true" && (
              <Button
                className="m-2"
                variant="dark"
                onClick={setButtonPopup}
                quantity={+1}
                style={{
                  backgroundColor: "#a67d85",
                  fontWeight: "400",
                  fontSize: "1.15rem",
                  borderColor: "#a67d85",
                  marginTop: "10px",
                }}
              >
                Add new store
              </Button>
            )}
          </div>
          <div className="add_new_store-popup">
            <div className="add_new_store-popup-inner">
              <AddNewStore
                class="checkout_popup"
                trigger={buttonPopup}
                setTrigger={setButtonPopup}
                setStores={setStores}
                //total_price={props.total_price}
              ></AddNewStore>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default StoresPage;
