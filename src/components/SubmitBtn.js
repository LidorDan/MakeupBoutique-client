import PaymentPopup from "./PaymentPopup";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
function SubmitBtn(props) {
  const [buttonCoPopup, setButtonCoPopup] = useState(false);
  return props.products.length !== 0 ? (
    <React.Fragment>
      <Button
        variant="dark"
        className="pay_now_button"
        onClick={(event) => setButtonCoPopup(true)}
      >
        Pay Now
      </Button>
      <PaymentPopup
        class="checkout_popup"
        trigger={buttonCoPopup}
        setTrigger={setButtonCoPopup}
        total_price={props.total_price}
        setProductsProps={props.setProducts}
      ></PaymentPopup>
    </React.Fragment>
  ) : (
    ""
  );
}

export default SubmitBtn;
