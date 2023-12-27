import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/AdPopup.css";
function AdPopup() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal className="ad_modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="modal_content">
        </Modal.Body>
        <Modal.Footer className="text-center footer_modal">
          <label>**All prices are after discount**</label>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AdPopup;
