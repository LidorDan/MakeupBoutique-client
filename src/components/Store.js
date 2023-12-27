import { useState, useCallback, useContext } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { RiMapPin2Line, RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import AuthContext from "../store/auth-context";

/*components */
import StoreMapPopup from "./StoreMapPopup";
import UpdateStorePopup from "./UpdateStorePopup";

/* styles */

import "../styles/ProductPopup.css";
import "../styles/Product.css";

const Store = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [updateButtonPopup, setUpdateButtonPopup] = useState(false);
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;

  const handleDeleteStore = (store_id) => {
    console.log(store_id);
    fetch("http://localhost:3000/storesPage/deleteStore", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        store_id: store_id,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => props.setStores(data))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Card
        style={{
          width: "17rem",
          height: "20rem",
          marginLeft: "10px",
          textAlign: "center",
          backgroundImage: `url(/Images/Backgrounds/stores.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
        className="card_store"
      >
        <div>
          <RiMapPin2Line
            className="map_icon"
            onClick={() => setButtonPopup(true)}
          />
          {isAdmin === "true" && (
            <RiDeleteBin2Line
              className="delete_icon"
              onClick={() => handleDeleteStore(props.id)}
            />
          )}
          {isAdmin === "true" && (
            <RiEdit2Line
              className="edit_icon"
              onClick={() => setUpdateButtonPopup(true)}
            />
          )}
        </div>
        <Card.Body className="store_body">
          <Card.Title className="store_title"></Card.Title>

          <Card.Text
            className="store-country"
            style={{ marginBottom: "0.4rem" }}
          >
            <b>
              <u>Country</u>
            </b>{" "}
            : {props.country}&nbsp;
          </Card.Text>

          <Card.Text className="store-city" style={{ marginBottom: "0.4rem" }}>
            <b>
              {" "}
              <u>City</u>
            </b>{" "}
            : {props.city}&nbsp;
          </Card.Text>

          <Card.Text className="store-city" style={{ marginBottom: "0.4rem" }}>
            <b>
              {" "}
              <u>Address</u>
            </b>{" "}
            : {props.address}&nbsp;
          </Card.Text>

          <Card.Text
            className="phone_number"
            style={{ marginBottom: "0.4rem" }}
          >
            <b>
              <u> Phone number</u>
            </b>{" "}
            : {props.phone_number}&nbsp;
          </Card.Text>
        </Card.Body>
      </Card>
      <div>
        <StoreMapPopup
          class="store_map_popup"
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          lat={props.lat}
          lon={props.lon}
        ></StoreMapPopup>
      </div>
      <div>
        <UpdateStorePopup
          class="update_store_popup"
          trigger={updateButtonPopup}
          setTrigger={setUpdateButtonPopup}
          item={props}
        ></UpdateStorePopup>
      </div>
    </Container>
  );
};
export default Store;
