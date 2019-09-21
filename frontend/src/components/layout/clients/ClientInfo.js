import React, { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

import axios from "axios";

import { ClientEndpoint } from "./../../../constants/endpoints/serverendpoints";

export const ClientInfo = props => {
  const idClient = props.id ? props.id : props.match.params.id;

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

  const modifyClient = () => {
    setErrors({ nickname: "", connection: "" });

    const newClient = getClientData();
    axios
      .put(ClientEndpoint + "/" + idClient, newClient)
      .then(res => (window.location.href = "http://localhost:5000/clients"))
      .catch(err => {
        if (err.response) {
          setErrors(err.response.data);
        } else {
          setErrors({ connection: "Problem z połączeniem z serwerem" });
        }
      });
  };

  const deleteClient = () => {
    setErrors({ nickname: "", connection: "" });

    axios
      .delete(ClientEndpoint + "/" + idClient)
      .then(res => (window.location.href = "http://localhost:5000/clients"))
      .catch(err => {
        setErrors({ connection: "Problem z połączeniem z serwerem" });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(ClientEndpoint + "/" + idClient)
        .then(result => {
          setNickname(result.data.nickname);
          setFirstName(result.data.firstname);
          setLastName(result.data.lastname);
          setGender(result.data.gender);
          setAddress(result.data.adress);
          setPostcode(result.data.postcode);
          setCity(result.data.city);
          setEmail(result.data.email);
          setPhone(result.data.phone);
          setFacebookFan(result.data.facebookfan);
        })
        .catch(err => (window.location.href = "http://localhost:5000/clients"));
    };
    fetchData();
  }, [idClient]);

  return (
    <React.Fragment>
      <div className="display-block col-12 float-left mt-3">
        <InputGroup className="display-block float-left mb-3 col-sm-12 col-lg-6">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Nazwa krótka</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={nickname}
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

        <InputGroup className="display-block float-left mb-3 col-sm-12 col-lg-6">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Imię</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={firstName !== null ? firstName : ""}
            onChange={e => setFirstName(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-12 col-lg-6">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Nazwisko</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={lastName !== null ? lastName : ""}
            onChange={e => setLastName(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-12 col-lg-6">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Adres</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={adress !== null ? adress : ""}
            onChange={e => setAddress(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-12 col-lg-4">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Kod Pocztowy</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={postcode !== null ? postcode : ""}
            onChange={e => setPostcode(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-12 col-lg-8">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Miasto</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={city !== null ? city : ""}
            onChange={e => setCity(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="display-block float-left mb-3 col-sm-12 col-lg-8">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">E-mail</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={email !== null ? email : ""}
            onChange={e => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="display-block float-left mb-3 col-sm-12 col-lg-4">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Telefon</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={phone !== null ? phone : ""}
            onChange={e => setPhone(e.target.value)}
          />
        </InputGroup>

        <select
          id="genderSelect"
          value={gender !== null ? gender : ""}
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

      <div className=" col-6 float-right">
        <Button
          className={props.id ? "d-none" : "mt-5 ml-5 float-right"}
          onClick={() => modifyClient()}
        >
          Zmień
        </Button>
        <Button
          className={props.id ? "d-none" : "mt-5 float-right btn-danger"}
          onClick={() => deleteClient()}
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
