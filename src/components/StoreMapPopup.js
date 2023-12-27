import React from "react";
import { Button } from "react-bootstrap";
import MyMap from "./MyMap";

function StoreMapPopup(props) {
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

        <MyMap lat={props.lat} lon={props.lon}></MyMap>
      </div>
    </div>
  ) : (
    ""
  );
}

export default StoreMapPopup;
