import React from "react";

export const ClientsColumns = [
  {
    Header: "Dane osobowe",
    columns: [
      {
        Header: "Krótka nazwa",
        accessor: "nickname",
        filterable: true,
        width: 100
      },
      {
        Header: "Imię",
        accessor: "firstname"
      },
      {
        Header: "Nazwisko",
        accessor: "lastname"
      }
    ]
  },
  {
    Header: "Zameldowanie",
    columns: [
      {
        Header: "Adres",
        accessor: "adress"
      },
      {
        Header: "Kod pocztowy",
        accessor: "postcode"
      },
      {
        Header: "Miasto",
        accessor: "city"
      }
    ]
  },
  {
    Header: "Kontakt",
    columns: [
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Telefon",
        accessor: "phone",
        width: 100
      }
    ]
  },
  {
    Header: "Płeć",
    accessor: "gender",
    width: 100
  },
  {
    Header: "Fan",
    accessor: "facebookfan",
    width: 70
  },
  {
    Header: "Akcje",
    width: 250,
    Cell: props => {
      return (
        <React.Fragment>
          <button
            className="btn btn-info ml-3"
            onClick={() => {
              window.location.href =
                "http://localhost:5000/client/" + props.original.nickname;
            }}
          >
            Edytuj
          </button>

          <button
            className="btn btn-secondary ml-3"
            onClick={() => {
              window.location.href =
                "http://localhost:5000/client/" +
                props.original.nickname +
                "/orders";
            }}
          >
            Zamówienia
          </button>
        </React.Fragment>
      );
    }
  }
];
