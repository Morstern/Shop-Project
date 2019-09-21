import React, { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

import axios from "axios";

import { OrderEndpoint } from "./../../../constants/endpoints/serverendpoints";

import moment from "moment";

export const OrderInfo = props => {
  const idOrder = props.id ? props.id : props.match.params.id;

  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [clientNickname, setClientNickname] = useState("");

  const [errors, setErrors] = useState({});

  const getOrderData = () => {
    return {
      idorder: orderId,
      orderdate: orderDate,
      amount: amount,
      discount: discount,
      clientNickname: clientNickname
    };
  };

  const modifyOrder = () => {
    setErrors({ nickname: "", connection: "" });

    const newOrder = getOrderData();

    axios
      .put(OrderEndpoint + "/" + idOrder, newOrder)
      .then(res => (window.location.href = "http://localhost:5000/orders"))
      .catch(err => {
        if (err.response) {
          setErrors(err.response.data);
        } else {
          setErrors({ connection: "Problem z połączeniem z serwerem" });
        }
      });
  };

  const deleteOrder = () => {
    setErrors({ nickname: "", connection: "" });

    axios
      .delete(OrderEndpoint + "/" + idOrder)
      .then(res => (window.location.href = "http://localhost:5000/orders"))
      .catch(err => {
        setErrors({ connection: "Problem z połączeniem z serwerem" });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(OrderEndpoint + "/" + idOrder)
        .then(result => {
          setOrderId(result.data.idorder ? result.data.idorder : "");
          setOrderDate(
            result.data.orderdate
              ? result.data.orderdate
              : moment().format("YYYY-MM-DD")
          );
          setAmount(result.data.amount ? result.data.amount : 0);
          setDiscount(result.data.discount ? result.data.discount : "0");
          setClientNickname(
            result.data.clientNickname ? result.data.clientNickname : ""
          );
        })
        .catch(err => (window.location.href = "http://localhost:5000/orders"));
    };
    fetchData();
  }, [idOrder]);

  return (
    <React.Fragment>
      <div className="display-block col-12 float-left mt-3">
        <InputGroup className="display-block float-left mb-3 col-sm-12 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Numer paczki</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={orderId}
            onChange={e => {
              setOrderId(e.target.value);
              setErrors({ ...errors, orderIdError: undefined });
            }}
            className={errors.orderIdError && "is-invalid"}
          />
          {errors.orderIdError !== "" && (
            <span className="display-block col-12 float-left text-right text-danger">
              {errors.orderIdError}
            </span>
          )}
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-6 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Nazwa klienta</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={clientNickname}
            onChange={e => {
              setClientNickname(e.target.value);
              setErrors({ ...errors, clientNicknameError: undefined });
            }}
            className={errors.clientNicknameError && "is-invalid"}
          />
          {errors.clientNicknameError !== "" && (
            <span className="display-block col-12 float-left text-right text-danger">
              {errors.clientNicknameError}
            </span>
          )}
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-6 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Ilość</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-6 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Data</InputGroup.Text>
          </InputGroup.Prepend>
          <input
            type="date"
            className="p-2"
            value={orderDate}
            onChange={e => setOrderDate(e.target.value)}
          ></input>
        </InputGroup>

        <select value={discount} onChange={e => setDiscount(e.target.value)}>
          <option value="0">0%</option>
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
        </select>
      </div>

      <div className=" col-6 float-right">
        <Button
          className={props.id ? "d-none" : "mt-5 ml-5 float-right"}
          onClick={() => modifyOrder()}
        >
          Zmień
        </Button>
        <Button
          className={props.id ? "d-none" : "mt-5 float-right btn-danger"}
          onClick={() => deleteOrder()}
        >
          Usuń
        </Button>
      </div>

      <div className="display-block float-left col-6 mt-5 h2">
        {errors.connection !== "" && (
          <span className="display-block text-danger text-center">
            {errors.connection}
          </span>
        )}
      </div>
    </React.Fragment>
  );
};
