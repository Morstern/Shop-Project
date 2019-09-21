import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export const DataTable = props => {
  const columns = props.columns;

  return (
    <ReactTable
      className="col-12 -striped"
      columns={columns}
      defaultPageSize={props.size}
      data={props.data}
      showPageSizeOptions={false}
      noDataText={""}
    ></ReactTable>
  );
};
