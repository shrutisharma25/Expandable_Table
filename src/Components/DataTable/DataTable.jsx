import React, { useState, useEffect } from 'react';
import './DataTable.css'; // Import your CSS file for styling

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
      <tr key={child.id}>
        <td>{child.text1}</td>
        <td>{child.text2}</td>
      </tr>
    ));
  };

  const renderRows = (rows) => {
    return rows.map((row) => (
      <React.Fragment key={row.id}>
        <tr
          className={isRowSelected(row.id) ? 'selected-row' : ''}
          onClick={() => toggleRow(row.id)}
        >
          <td>{row.text1}</td>
          <td>{row.text2}</td>
        </tr>
        {row.children.length > 0 && isRowSelected(row.id) && renderChildren(row.children)}
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
      <tbody>{renderRows(data.rows)}</tbody>
    </table>
  );
};

const App = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/path/to/data.json')
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="app-container">
      <h1>Expandable Table with React</h1>
      {jsonData ? <DataTable data={jsonData} /> : <div>Loading...</div>}
    </div>
  );
};

export default App;
