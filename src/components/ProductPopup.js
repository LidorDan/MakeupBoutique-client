import React from "react";
import { Button } from "react-bootstrap";

function ProductPopup(props) {
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

        <img src={props.item.imgsrc1} alt="" className="ImgProductInfo"></img>
        <br></br>
        <div className="ProductDetails">
          <label className="Product_brand">
            <u>Brand :</u>&nbsp;{props.item.brand}
          </label>
          <br></br>
          <label className="Product_category">
            <u>Category :</u>&nbsp;{props.item.category}
          </label>
          <br></br>
          <label className="Product_rating">
            <u>Rating :</u>&nbsp;{props.item.rating}
          </label>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ProductPopup;
