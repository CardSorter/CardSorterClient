// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ headers, data }) => {
  const dataContainerRef = useRef(null);

  // Function to scroll to the top of the data container
  const scrollToTop = () => {
    if (dataContainerRef.current) {
      dataContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  // Watch for changes in data and scroll to top if data changes
  useEffect(() => {
    scrollToTop();
  }, [data]);

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Function to handle header click and sorting
  const handleHeaderClick = (column) => {
    // Calculate the new sort direction based on the current state
    const newDirection = (column === sortedColumn && sortDirection === 'asc') ? 'desc' : 'asc';
    setSortedColumn(column);
    setSortDirection(newDirection);
  };

  // Sort data based on the current sortedColumn and sortDirection
  const sortedData = [...data];
  if (sortedColumn) {
    sortedData.sort((a, b) => {
      const valueA = a[headers.indexOf(sortedColumn)];
      const valueB = b[headers.indexOf(sortedColumn)];
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <div className="data-container" ref={dataContainerRef}>
      <table>
        <thead id='table_header'>
          <tr>
            {headers.map((header) => (
              <th key={'header' + header} onClick={() => handleHeaderClick(header)}>
                {header} {sortedColumn === header && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((line, index) => (
            <tr key={'line' + index}>
              {line.map((item, index) => {
                if (item instanceof Array) {
                  return (
                    <td key={'item' + index}>
                      <ul>
                        {item.map((child, index) => (
                          <li key={'child' + index}>{child}</li>
                        ))}
                      </ul>
                    </td>
                  );
                }
                return <td key={'item' + index}>{item}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  headers: PropTypes.arrayOf(String).isRequired,
  data: PropTypes.arrayOf(Array).isRequired,
};

export default DataTable;