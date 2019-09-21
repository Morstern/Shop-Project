import React, { useState, useEffect } from "react";
import axios from "axios";

import { OrdersMenu } from "./OrdersMenu.js";
import { DataTable } from "./../common/DataTable";
import { OrderEndpoint } from "../../../constants/endpoints/serverendpoints.js";
import { OrderColumns } from "./OrdersColumns";

import { formatDateFromDatabase } from "./OrderUtils";

export const Orders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(OrderEndpoint);
      const fixedData = result.data.map(order => {
        if (order.orderdate != null) {
          order.orderdate = formatDateFromDatabase(order.orderdate);
        }
        return order;
      });
      setData(fixedData);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-light">
      <OrdersMenu />
      <DataTable
        columns={OrderColumns}
        data={data.length > 0 ? data : []}
        size={12}
      />
    </div>
  );
};
