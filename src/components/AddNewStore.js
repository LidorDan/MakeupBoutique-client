import React, { useState } from "react";

const AddNewStore = (props) => {
  async function SubmitHandler(event) {
    event.preventDefault();
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;
    var address = document.getElementById("address").value;
    var phone_number = document.getElementById("phone_number").value;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;

    console.log(city);

    fetch("http://localhost:3000/storesPage/addStore", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city: city,
        country: country,
        address: address,
        phone_number: phone_number,
        lat: latitude,
        lon: longitude,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => {
        props.setStores(data);
        props.setTrigger(false);
      })
      .catch((err) => console.log(err));
  }
  return props.trigger ? (
    <div className="addstore_popup">
      <div className="addstore_popup-inner">
        <button
          type="submit"
          class="btn"
          className="addstore_form_actions close_payment_btn"
          onClick={() => props.setTrigger(false)}
        >
          X
        </button>
        <br></br>
        <form onSubmit={SubmitHandler}>
          <div className="payment_form_controls text-center">
            <br></br>
            <lable for="city">City</lable>
            <br></br>
            <input type="text" id="city" name="city" required></input>
            <br></br>

            <lable for="country">Country</lable>
            <br></br>
            <input type="text" id="country" name="country" required></input>
            <br></br>

            <lable for="address">Address</lable>
            <br></br>
            <input type="text" id="address" name="address" required></input>
            <br></br>

            <label for="latitude">Latitude:</label>
            <br></br>
            <input type="text" id="latitude" name="latitude" required></input>
            <br></br>

            <lable for="longitude">Longitude</lable>
            <br></br>
            <input type="text" id="longitude" name="longitude" required></input>
            <br></br>
            <br></br>

            <lable for="phone_number">Phone Number</lable>
            <br></br>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              required
            ></input>
            <br></br>
            <br></br>
            <button
              type="submit"
              class="btn"
              className="payment_form_actions btn btn-dark mb"
            >
              Submit
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
};

export default AddNewStore;
