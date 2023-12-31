// App.js

import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file for styling

const DataTable = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRow = (rowId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  const isRowSelected = (rowId) => selectedRows.includes(rowId);

  const renderChildren = (children) => {
    return children.map((child) => (
      <tr
        key={child.id}
        className={isRowSelected(child.id) ? "selected-row" : ""}
        onClick={() => toggleRow(child.id)}
      >
        <td>{child.text1}</td>
        <td>{child.text2}</td>
      </tr>
    ));
  };

  const renderRows = (rows) => {
    return rows.map((row) => (
      <React.Fragment key={row.id}>
        <tr
          className={isRowSelected(row.id) ? "selected-row" : ""}
          onClick={() => toggleRow(row.id)}
        >
          <td>{row.text1}</td>
          <td>{row.text2}</td>
        </tr>
        {row.children.length > 0 &&
          isRowSelected(row.id) &&
          renderChildren(row.children)}
      </React.Fragment>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Text 1</th>
          <th>Text 2</th>
        </tr>
      </thead>
      <tbody>{renderRows(data)}</tbody>
    </table>
  );
};

const App = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("https://shrutisharma25.github.io/Table__API/data.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data.rows))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="app-container">
      <h1>Expandable Table with React</h1>
      {jsonData ? <DataTable data={jsonData} /> : <div>Loading...</div>}
    </div>
  );
};

export default App;
