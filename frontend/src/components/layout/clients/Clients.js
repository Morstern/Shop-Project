import React, { useState, useEffect } from "react";
import axios from "axios";

import { ClientsMenu } from "./ClientsMenu";
import { DataTable } from "./../common/DataTable";
import { ClientsColumns } from "./ClientsColumns";
import { ClientEndpoint } from "../../../constants/endpoints/serverendpoints";

export const Clients = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ClientEndpoint);
      const fixedData = result.data.map(client => {
        if (client.facebookfan != null) {
          client.facebookfan = client.facebookfan === 1 ? "Tak" : "Nie";
        }
        return client;
      });
      setData(fixedData);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-light">
      <ClientsMenu />
      <DataTable
        columns={ClientsColumns}
        data={data.length > 0 ? data : []}
        size={8}
      />
    </div>
  );
};
