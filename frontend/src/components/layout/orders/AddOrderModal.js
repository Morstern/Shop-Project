import React, { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import moment from "moment";

import axios from "axios";

import {
  ClientEndpoint,
  OrderEndpoint
} from "../../../constants/endpoints/serverendpoints";

export const AddOrderModal = props => {
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState(moment().format("YYYY-MM-DD"));
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [clientNickname, setClientNickname] = useState("");

  const [clients, setClients] = useState([]);

  const [suggestions, setSuggestions] = useState([]);

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

  const addOrderToDatabase = () => {
    setErrors({ orderId: "", clientNicknameError: "", connection: "" });

    const newOrder = getOrderData();

    axios
      .post(OrderEndpoint, newOrder)
      .then(res => window.location.reload(false))
      .catch(err => {
        if (err.response) {
          setErrors(err.response.data);
        } else {
          setErrors({ connection: "Problem z połączeniem z serwerem" });
        }
      });
  };

  const getSuggetions = value => {
    setSuggestions(
      value.length === 0
        ? []
        : clients.filter(
            client =>
              client.nickname.toLowerCase().slice(0, value.length) === value ||
              client.nickname.slice(0, value.length) === value
          )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(ClientEndpoint + "/nicknames")
        .then(result => {
          setClients(result.data);
        })
        .catch(err => (window.location.href = "http://localhost:5000/orders"));
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="display-block col-12 float-left mb-3">
        <button
          className="float-right btn-danger btn-sm"
          onClick={() => {
            props.closeModal();
          }}
        >
          X
        </button>
      </div>

      <div className="display-block col-12 float-left">
        <InputGroup className="display-block float-left mb-3 col-sm-12 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Numer paczki</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={e => {
              setOrderId(e.target.value);
              setErrors({ ...errors, orderId: undefined });
            }}
            className={errors.orderId && "is-invalid"}
          />
          {errors.orderId !== "" && (
            <span className="display-block col-12 float-left text-right text-danger">
              {errors.orderId}
            </span>
          )}
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-6 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Nazwa klienta</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={e => {
              setClientNickname(e.target.value);
              getSuggetions(e.target.value);
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
        <div className="display-block float-left mb-3 col-sm-6 col-lg-12 pb-3">
          <select
            defaultValue=""
            onChange={e => setClientNickname(e.target.value)}
          >
            <option value="" disabled>
              Wybierz
            </option>
            {suggestions !== [] &&
              suggestions.map(suggestion => {
                return (
                  <option key={suggestion.nickname} value={suggestion.nickname}>
                    {suggestion.nickname}
                  </option>
                );
              })}
          </select>
        </div>
        <InputGroup className="display-block float-left mb-3 col-sm-6 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Ilość</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl onChange={e => setAmount(e.target.value)} />
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

        <select defaultValue="0" onChange={e => setDiscount(e.target.value)}>
          <option value="0">0%</option>
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
        </select>
      </div>
      <div className="display-block col-6 float-right">
        <Button
          className="mt-5 float-right"
          onClick={() => addOrderToDatabase()}
        >
          Dodaj
        </Button>
      </div>

      <div className="display-block float-left col-6 mt-5 h2">
        {errors.connection !== "" && (
          <span className="display-block text-danger text-center">
            {errors.connection}
          </span>
        )}
      </div>
    </div>
  );
};
