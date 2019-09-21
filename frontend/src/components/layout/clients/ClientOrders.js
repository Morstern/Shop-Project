import React, { useState, useEffect } from "react";

import axios from "axios";

import { ClientInfo } from "./ClientInfo";
import { DataTable } from "./../common/DataTable";

import { ClientEndpoint } from "./../../../constants/endpoints/serverendpoints";
import { OrderColumns } from "./../orders/OrdersColumns";

export const ClientOrders = props => {
  const [data, setData] = useState({});
  const { id } = props.match.params;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ClientEndpoint + "/" + id + "/orders");
      setData(result.data);
    };
    fetchData();
  }, [id]);

  return (
    <React.Fragment>
      <ClientInfo id={id} />
      <DataTable columns={OrderColumns} data={data.length > 0 ? data : []} />
    </React.Fragment>
  );
};
