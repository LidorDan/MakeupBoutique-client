import React from "react";
import { Button } from "react-bootstrap";
function UpdateStorePopup(props) {
  const SubmitHandler = (store_id) => (event) => {
    event.preventDefault();

    var new_phone_number = document.getElementById("new_phone").value;

    fetch("http://localhost:3000/storesPage/updateStorePhone", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: store_id,
        new_phone_number: new_phone_number,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => {
        props.item.setStores(data);
        props.setTrigger(false);
      })
      .catch((err) => console.log(err));
  };

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
        <div className="Product_Info"></div>
        <label className="Product_title">
          <u>{props.item.title}</u>
        </label>
        <br></br>

        <form onSubmit={SubmitHandler(props.item.id)}>
          <div className="payment_form_controls text-center">
            <br></br>
            <lable for="new_phone">New Phone Number</lable>
            <br></br>
            <input type="text" id="new_phone" name="new_phone" required></input>
            <br></br>

            <button
              type="submit"
              class="btn"
              className="update_phone btn btn-dark"
            >
              Update Phone Number
            </button>
            <br></br>
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

export default UpdateStorePopup;
