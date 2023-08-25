// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from 'react';
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

  return (
    <div className="data-container" ref={dataContainerRef}>
      <table>
        <thead>
          <tr>
            {
              headers.map((header) =>
                <th key={'header' + header}>{header}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((line, index) =>
              <tr key={'line' + index}>
                {
                  line.map((item, index) => {
                    if (item instanceof Array) {
                      return <td key={'item' + index}><ul>{
                        item.map((child, index) =>
                          <li key={'child' + index}>{child}</li>)}</ul></td>;
                    }
                    return <td key={'item' + index}>{item}</td>;
                  })
                }
              </tr>
            )
          }
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
