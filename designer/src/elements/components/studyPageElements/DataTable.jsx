import React from 'react';
import PropTypes from 'prop-types';

const DataTable = ({headers, data}) => {
  return (
    <div className="data-container">
      <table>
        <thead>
          <tr>
            {
              headers.map((header) =>
                <th key={'header'+header}>{header}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((line) =>
              <tr key={'line'+line}>
                {
                  line.map((item, index) =>
                    <td key={'item'+index}>{item}</td>
                  )
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
