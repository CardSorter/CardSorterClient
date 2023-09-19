// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DataTableSorting = ({ headers, data }) => {
    const dataContainerRef = useRef(null);

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
                <colgroup>
                    <col style={{ width: '50px' }} />
                    <col style={{ width: '100px' }} />
                    <col style={{ width: '100px' }} />
                    <col style={{ width: '200px' }} />
                </colgroup>
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
                    {sortedData.map((item, index, array) => (
                        <tr key={item.no}>
                            {index === 0 || item.no !== array[index - 1].no ? (
                                <td rowSpan={array.filter((el) => el.no === item.no).length}>
                                    {item.no}
                                </td>
                            ) : null}
                            <td>{item.category}</td>
                            <td>
                                {Array.isArray(item.cards) ? (
                                    <ul>
                                        {item.cards.map((desc, index) => (
                                            <li key={index}>{desc}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    item.cards
                                )}
                            </td>
                            {index === 0 || item.no !== array[index - 1].no ? (
                                <td rowSpan={array.filter((el) => el.no === item.no).length}>
                                    {item.comment}
                                </td>
                            ) : null}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

DataTableSorting.propTypes = {
    headers: PropTypes.arrayOf(String).isRequired,
    data: PropTypes.arrayOf(Array).isRequired,
};

export default DataTableSorting;