import React from "react";

export const OrderColumns = [
  {
    Header: "Przesyłka",
    columns: [
      {
        Header: "Numer paczki",
        accessor: "idorder",
        filterable: true,
        width: 300
      },
      {
        Header: "Data zamówienia",
        accessor: "orderdate"
      },
      {
        Header: "Ilość kubków",
        accessor: "amount",
        width: 150
      },
      {
        Header: "Rabat [%]",
        accessor: "discount",
        width: 150
      }
    ]
  },
  {
    Header: "Klient",
    columns: [
      {
        Header: "Krótka nazwa",
        accessor: "clientNickname"
      }
    ]
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
                "http://localhost:5000/order/" + props.original.idorder;
            }}
          >
            Edytuj
          </button>

          <button
            className="btn btn-secondary ml-5"
            onClick={() => {
              window.location.href =
                "http://localhost:5000/client/" + props.original.clientNickname;
            }}
          >
            Klient
          </button>
        </React.Fragment>
      );
    }
  }
];
