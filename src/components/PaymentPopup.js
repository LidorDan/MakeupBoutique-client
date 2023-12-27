import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import "../styles/PaymentPopup.css";
import AuthContext from "../store/auth-context";

function PaymentPopup(props) {
  const authCtx = useContext(AuthContext);

  const [errorMsg, setError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost:3000/shoppingBag/orderProducts?id=" + authCtx.userId
    )
      .then((Response) => Response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);
  const handleCardNumberChange = () => {
    setCardNumber(document.getElementById("ccnum").value);
  };
  function validateCard(cardNumber, cardType) {
    if (!onlyNumbers(cardNumber)) {
      return false;
    }
    if (
      cardType === "visa" ||
      cardType === "masterCard" ||
      cardType === "discover"
    ) {
      if (cardNumber.length === 16) return true;
    }
    if (cardType === "amex" && cardNumber.length === 15) {
      return true;
    }
    return false;
  }
  function validateExpDate(expmonthValue, expyearValue) {
    console.log(expmonthValue);
    var expMonth = parseInt(expmonthValue);
    var expYear = parseInt(expyearValue);
    let newDate = new Date();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    if (expYear < year) {
      return false;
    }
    if (expYear === year && expMonth < month) {
      return false;
    }
    return true;
  }
  function onlyLetters(value) {
    var lettersRegEx = /^[a-zA-Z]+$/;
    return lettersRegEx.test(value);
  }
  function onlyNumbers(value) {
    var numbersRegEx = /^[0-9\b]+$/;
    return numbersRegEx.test(value);
  }
  function paymentValidations(
    nameValue,
    cardNumberValue,
    cardType,
    expmonthValue,
    expyearValue,
    cvvValue
  ) {
    if (!onlyLetters(nameValue)) {
      props.setProductsProps([]);
      console.log("!!!!");
      setError("Invalid name");
      return false;
    }
    if (!validateCard(cardNumberValue, cardType)) {
      setError("Invalid card number");
      return false;
    }
    if (!validateExpDate(expmonthValue, expyearValue)) {
      setError("Invalid expiry date");
      return false;
    }
    if (!onlyNumbers(expmonthValue)) {
      setError("Invalid month");
      return false;
    }
    if (!onlyNumbers(expyearValue)) {
      setError("Invalid year");
      return false;
    }
    if (!onlyNumbers(cvvValue) || cvvValue.length !== 3) {
      setError("Invalid CVV");
      return false;
    }
    setError("");
    return true;
  }
  async function submitHandler(event) {
    event.preventDefault();
    var nameValue = document.getElementById("cname").value;
    var cardNumberValue = document.getElementById("ccnum").value;
    cardNumberValue = cardNumberValue.replace(/\s/g, "");
    var cardType = document.getElementById("cardType").value;
    var expmonthValue = document.getElementById("expmonth").value;
    var expyearValue = document.getElementById("expyear").value;
    expyearValue = expyearValue.replace(/\s/g, "");
    var cvvValue = document.getElementById("cvv").value;
    cvvValue = cvvValue.replace(/\s/g, "");
    var isPaymentValid = paymentValidations(
      nameValue,
      cardNumberValue,
      cardType,
      expmonthValue,
      expyearValue,
      cvvValue
    );
    if (isPaymentValid) {
      setCardNumber("");
      fetch(
        "http://localhost:3000/shoppingBag/clearBag?id=" + authCtx.userId
      ).catch((err) => console.log(err));
      fetch("http://localhost:3000/shoppingBag/addOrder", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: authCtx.userId,
          client_name: document.getElementById("cname").value,
          credit_card_number: document.getElementById("ccnum").value,
          total_price: props.total_price.toString(),
          products: products,
        }),
      });
      props.setProductsProps([]);
      props.setTrigger(false);
    }
  }
  return props.trigger ? (
    <div className="payment_popup">
      <div className="payment_popup-inner">
        <button
          type="submit"
          class="btn"
          className="payment_form_actions close_payment_btn"
          onClick={() => props.setTrigger(false)}
        >
          X
        </button>
        <br></br>
        <form onSubmit={submitHandler}>
          <div className="payment_form_controls text-center">
            <div className="card_div">
              <label className="card_number_label">{cardNumber}</label>
            </div>
            <br></br>
            <Row>
              <Col>
                <lable for="cname">Name on card:</lable>
                <br></br>
                <input type="text" id="cname" name="cardname"></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Card type:</label>
                <br></br>
                <select id="cardType">
                  <option value="visa">Visa</option>
                  <option value="masterCard">MasterCard</option>
                  <option value="discover">Discover</option>
                  <option value="amex">Amex</option>
                </select>
              </Col>
              <Col>
                <label for="ccnum">Card number:</label>
                <br></br>
                <input
                  type="text"
                  id="ccnum"
                  name="cardnumber"
                  onChange={handleCardNumberChange}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label for="expmonth">Exp Month:</label>
                <br></br>
                <select id="expmonth">
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </Col>
              <Col>
                <label for="expyear">Exp Year:</label>
                <br></br>
                <input type="text" id="expyear" name="expyear"></input>
              </Col>
            </Row>
            <Row>
              <Col>
                <label for="cvv">CVV:</label>
                <br></br>
                <input type="text" id="cvv" name="cvv"></input>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col>
                <p className="text-center">
                  Total price : {props.total_price} ₪
                </p>
                <div>
                  <button
                    type="submit"
                    class="btn"
                    className="payment_form_actions btn btn-dark"
                  >
                    Submit
                  </button>
                </div>
                <label id="errorLabel">{errorMsg}</label>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PaymentPopup;
