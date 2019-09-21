import React, { useState } from "react";

import ReactModal from "react-modal";
import { Button } from "react-bootstrap";

import { AddOrderModal } from "./AddOrderModal";

export const OrdersMenu = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.Fragment>
      <div className="display-block float-left col-10 mt-2 mb-2">
        <Button onClick={() => setShowModal(true)} className="mr-2">
          Dodaj zamówienie
        </Button>

        <ReactModal
          isOpen={showModal}
          appElement={document.getElementById("root")}
        >
          <AddOrderModal
            closeModal={() => {
              setShowModal(false);
            }}
          />
        </ReactModal>
      </div>
    </React.Fragment>
  );
};
