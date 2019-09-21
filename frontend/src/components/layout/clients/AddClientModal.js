import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

import axios from "axios";

import { ClientEndpoint } from "../../../constants/endpoints/serverendpoints";

export const AddClientModal = props => {
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [adress, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [gender, setGender] = useState("");

  const [facebookFan, setFacebookFan] = useState(false);

  const [errors, setErrors] = useState({});

  const getClientData = () => {
    return {
      nickname: nickname,
      firstName: firstName,
      lastName: lastName,
      adress: adress,
      postcode: postcode,
      city: city,
      email: email,
      phone: phone,
      gender: gender,
      facebookFan: facebookFan
    };
  };

  const addClientToDatabase = () => {
    setErrors({ nickname: "", connection: "" });

    const newClient = getClientData();

    axios
      .post(ClientEndpoint, newClient)
      .then(res => window.location.reload(false))
      .catch(err => {
        if (err.response) {
          setErrors(err.response.data);
        } else {
          setErrors({ connection: "Problem z połączeniem z serwerem" });
        }
      });
  };

  return (
    <React.Fragment>
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
        <InputGroup className="display-block float-left mb-3 col-sm-6 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Nazwa krótka</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="nickname"
            onChange={e => {
              setNickname(e.target.value);
              setErrors({ ...errors, nickname: undefined });
            }}
            className={errors.nickname && "is-invalid"}
          />
          {errors.nickname !== "" && (
            <span className="display-block col-12 float-left text-right text-danger">
              {errors.nickname}
            </span>
          )}
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-6 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Imię</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="nickname"
            onChange={e => setFirstName(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-6 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Nazwisko</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="nickname"
            onChange={e => setLastName(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-6 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Adres</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="nickname"
            onChange={e => setAddress(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-4 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Kod Pocztowy</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="nickname"
            onChange={e => setPostcode(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-8 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Miasto</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="nickname" onChange={e => setCity(e.target.value)} />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-8 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">E-mail</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="nickname" onChange={e => setEmail(e.target.value)} />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-4 col-lg-12">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Telefon</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="nickname" onChange={e => setPhone(e.target.value)} />
        </InputGroup>

        <select
          id="genderSelect"
          defaultValue=""
          onChange={e => setGender(e.target.value)}
        >
          <option value="" disabled>
            Wybierz
          </option>
          <option value="mężczyzna">Mężczyzna</option>
          <option value="kobieta">Kobieta</option>
        </select>

        <label className="ml-3">
          <input
            type="checkbox"
            checked={facebookFan}
            onChange={e => {
              setFacebookFan(e.target.checked);
            }}
          />
          Fan na facebooku
        </label>
      </div>
      <div className="display-block col-6 float-right">
        <Button
          className="mt-5 float-right"
          onClick={() => addClientToDatabase()}
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
    </React.Fragment>
  );
};
