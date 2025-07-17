import React, { useRef, useEffect, useState } from 'react';
import styles from "./Datatable.module.scss";

interface DataTableProps {
  headers: string[];
  data: (string | number | (string | number)[])[][];
}

const DataTable: React.FC<DataTableProps> = ({ headers, data }) => {
  const dataContainerRef = useRef<HTMLDivElement>(null);

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

  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setSortedColumn(headers[0]);
    setSortDirection('asc');
  }, []);

  const handleHeaderClick = (column: string) => {
    const newDirection = (column === sortedColumn && sortDirection === 'asc') ? 'desc' : 'asc';

    setSortedColumn(column);
    setSortDirection(newDirection);
  };

  // Sort data based on the current sortedColumn and sortDirection
  const sortedData = [...data];
  if (sortedColumn) {
    let sortedColumn2: string;
    if (headers.indexOf(sortedColumn) === -1)
      sortedColumn2 = headers[0];
    else
      sortedColumn2 = sortedColumn;

    sortedData.sort((a, b) => {
      let valueA: any = a[headers.indexOf(sortedColumn2)];
      let valueB: any = b[headers.indexOf(sortedColumn2)];

      if (sortedColumn2 === 'cards sorted') {
        valueA = parseFloat(String(valueA).replace('%', ''));
        valueB = parseFloat(String(valueB).replace('%', ''));
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
      if (sortedColumn2 === 'participant no') {
        valueA = parseInt(String(valueA).replace('#', ''), 10);
        valueB = parseInt(String(valueB).replace('#', ''), 10);
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      //time can be h,m,s
      if (sortedColumn2 === 'time taken') {
        const timeToSeconds = (timeStr: string) => {
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

        valueA = timeToSeconds(String(valueA));
        valueB = timeToSeconds(String(valueB));

        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
        return sortDirection === 'asc' ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
      }

      if (!isNaN(Number(valueA))) {
        return -1; // Numbers come first in ascending order
      }
      if (!isNaN(Number(valueB))) {
        return 1; // Numbers come first in ascending order
      }

      if (typeof valueA === 'object') {
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      }
      else {
        if (String(valueA).toLowerCase() < String(valueB).toLowerCase()) return sortDirection === 'asc' ? -1 : 1;
        if (String(valueA).toLowerCase() > String(valueB).toLowerCase()) return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <div className={styles.dataContainer} ref={dataContainerRef}>
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
            <tr key={'line' + index} className={index % 2 === 0 ? styles.rowWhite : styles.rowGray}>
              {line.map((item, index) => {
                if (Array.isArray(item)) {
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

export default DataTable;