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

  useEffect(() => {
    setSortedColumn(headers[0]);
    setSortDirection('asc');
  }, []);

  const handleHeaderClick = (column) => {
    const newDirection = (column === sortedColumn && sortDirection === 'asc') ? 'desc' : 'asc';

    setSortedColumn(column);
    setSortDirection(newDirection);
  };

  // Sort data based on the current sortedColumn and sortDirection
  const sortedData = [...data];
  if (sortedColumn) {
    let sortedColumn2;
    if (headers.indexOf(sortedColumn) === -1)
      sortedColumn2 = headers[0];
    else
      sortedColumn2 = sortedColumn;

    sortedData.sort((a, b) => {
      let valueA = a[headers.indexOf(sortedColumn2)];
      let valueB = b[headers.indexOf(sortedColumn2)];

      if (sortedColumn2 === 'cards sorted') {
        valueA = parseFloat(valueA.replace('%', ''));
        valueB = parseFloat(valueB.replace('%', ''));
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
      if (sortedColumn2 === 'participant no') {
        valueA = parseInt(valueA.replace('#', ''));
        valueB = parseInt(valueB.replace('#', ''));
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      //time can has h,m,s
      if (sortedColumn2 === 'time taken') {
        const timeToSeconds = (timeStr) => {
          // Function to convert time to seconds
          const parts = timeStr.split(' ');
          return parts.reduce((acc, part, index) => {
            const value = parseInt(part, 10);
            const unit = parts[index + 1];

            if (unit === 'h') {
              return acc + value * 3600;
            } else if (unit === 'm') {
              return acc + value * 60;
            } else if (unit === 's') {
              return acc + value;
            }

            return acc;
          }, 0);
        };

        valueA = timeToSeconds(valueA);
        valueB = timeToSeconds(valueB);

        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }


      if (!isNaN(valueA)) {
        return -1; // Numbers come first in ascending order
      }
      if (!isNaN(valueB)) {
        return 1; // Numbers come first in ascending order
      }


      if (typeof (valueA) === 'object') {
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      }
      else {
        if (valueA.toLowerCase() < valueB.toLowerCase()) return sortDirection === 'asc' ? -1 : 1;
        if (valueA.toLowerCase() > valueB.toLowerCase()) return sortDirection === 'asc' ? 1 : -1;
      }
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
            <tr key={'line' + index} className={index % 2 === 0 ? 'row-white' : 'row-gray'}>
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