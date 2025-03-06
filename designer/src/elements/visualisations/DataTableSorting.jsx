// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DataTableSorting = ({ headers, data }) => {
    const dataContainerRef = useRef(null);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    // Function to handle header click and sorting
    const handleHeaderClick = (column) => {
        const newDirection = (column === sortedColumn && sortDirection === 'asc') ? 'desc' : 'asc';
        setSortedColumn(column);
        setSortDirection(newDirection);
    };

    let sortedData = data.map(item => [item.no, item.category, item.cards, item.comment]);

    // Function to find the smallest value in a row
    function findSmallestValue(data) {
        // Extract elements between 2nd and length-2 positions
        const relevantElements = data[2];

        // Find the smallest value among the relevant elements
        const smallestValue = relevantElements.reduce((min, current) => {
            // Convert elements to lowercase strings for case-insensitive comparison
            const minString = String(min).toLowerCase();
            const currentString = String(current).toLowerCase();

            // Compare as strings and update min if needed
            return minString.localeCompare(currentString) === 1 ? current : min;
        });

        return smallestValue;
    }

    function findLargestValue(data) {
        const relevantElements = data[2];

        const largestValue = relevantElements.reduce((max, current) => {
            const maxString = String(max).toLowerCase();
            const currentString = String(current).toLowerCase();

            return maxString.localeCompare(currentString) === -1 ? current : max;
        });

        return largestValue;
    }

    if (sortedColumn) {
        let sortedColumn2;
        if (headers.indexOf(sortedColumn) === -1)
            sortedColumn2 = headers[0];
        else
            sortedColumn2 = sortedColumn;
        var sortedData2 = [];
        var sortedDataTemp = [...sortedData];
        if (sortedColumn2 === 'categories') {
            if (sortDirection === 'asc') {
                while (sortedDataTemp.length > 0) {

                    var smallest = sortedDataTemp[0];
                    var smallestIndex = 0;
                    for (var i = 1; i < sortedDataTemp.length; i++) {

                        if (isNaN(parseInt(sortedDataTemp[i][1])) && isNaN(parseInt(smallest[1]))) {
                            if ((sortedDataTemp[i][1].toLowerCase()) < (smallest[1].toLowerCase())) {
                                smallest = sortedDataTemp[i];
                                smallestIndex = i;
                            }
                        }
                        else {
                            if (parseInt(sortedDataTemp[i][1]) < parseInt(smallest[1])) {
                                smallest = sortedDataTemp[i];
                                smallestIndex = i;
                            }
                        }
                    }

                    var smallestValue = smallest[0];
                    var group = sortedDataTemp.filter(row => row[0] === smallestValue);

                    sortedData2.push(...group);

                    sortedDataTemp = sortedDataTemp.filter(row => row[0] !== smallestValue);
                }
                sortedData = [...sortedData2];

            }
            else {
                while (sortedDataTemp.length > 0) {
                    var largest = null;
                    var largestIndex = -1;

                    for (var i = 0; i < sortedDataTemp.length; i++) {
                        if (isNaN(parseInt(sortedDataTemp[i][1]))) {
                            if (!largest || (isNaN(parseInt(largest[1])) && (sortedDataTemp[i][1].toLowerCase() > largest[1].toLowerCase()))) {
                                largest = sortedDataTemp[i];
                                largestIndex = i;
                            } else if (!isNaN(parseInt(largest[1]))) {
                                largest = sortedDataTemp[i];
                                largestIndex = i;
                            }
                        } else if (!largest || (!isNaN(parseInt(largest[1])) && parseInt(sortedDataTemp[i][1]) > parseInt(largest[1]))) {
                            largest = sortedDataTemp[i];
                            largestIndex = i;
                        }
                    }

                    var largestValue = largest[0];
                    var group = sortedDataTemp.filter(row => row[0] === largestValue);

                    // Sort the group in descending order within each group
                    group.sort((a, b) => {
                        if (isNaN(parseInt(a[1])) && isNaN(parseInt(b[1]))) {
                            return b[1].toLowerCase().localeCompare(a[1].toLowerCase());
                        } else {
                            return parseInt(b[1]) - parseInt(a[1]);
                        }
                    });

                    sortedData2.push(...group);

                    sortedDataTemp = sortedDataTemp.filter(row => row[0] !== largestValue);
                }



                sortedData = [...sortedData2];

            }
        }
        else if (sortedColumn2 === 'cards') {
            if (sortDirection === 'asc') {

                while (sortedDataTemp.length > 0) {
                    var smallest = sortedDataTemp[0];
                    var smallestIndex = 0;

                    for (var i = 1; i < sortedDataTemp.length; i++) {
                        if (
                            isNaN(parseInt(findSmallestValue(sortedDataTemp[i]))) &&
                            isNaN(parseInt(findSmallestValue(smallest)))
                        ) {
                            if (
                                findSmallestValue(sortedDataTemp[i]).toLowerCase() < findSmallestValue(smallest).toLowerCase()) {
                                smallest = sortedDataTemp[i];
                                smallestIndex = i;
                            }
                        } else {
                            if (parseInt(findSmallestValue(sortedDataTemp[i])) < parseInt(findSmallestValue(smallest))) {
                                smallest = sortedDataTemp[i];
                                smallestIndex = i;
                            }
                        }
                    }

                    var smallestValue = smallest[0];
                    var group = sortedDataTemp.filter(row => row[0] === smallestValue);

                    sortedData2.push(...group);

                    sortedDataTemp = sortedDataTemp.filter((row) => row[0] !== smallestValue);
                }
                sortedData = [...sortedData2];

            }
            else {
                while (sortedDataTemp.length > 0) {
                    var largest = sortedDataTemp[0];
                    var largestIndex = 0;

                    for (var i = 1; i < sortedDataTemp.length; i++) {
                        if (
                            isNaN(parseInt(findLargestValue(sortedDataTemp[i]))) &&
                            isNaN(parseInt(findLargestValue(largest)))
                        ) {
                            if (
                                findLargestValue(sortedDataTemp[i]).toLowerCase() > findLargestValue(largest).toLowerCase()
                            ) {
                                largest = sortedDataTemp[i];
                                largestIndex = i;
                            }
                        } else {
                            if (parseInt(findLargestValue(sortedDataTemp[i])) > parseInt(findLargestValue(largest))) {
                                largest = sortedDataTemp[i];
                                largestIndex = i;
                            }
                        }
                    }

                    var largestValue = largest[0];
                    var group = sortedDataTemp.filter(row => row[0] === largestValue);

                    sortedData2.push(...group);

                    sortedDataTemp = sortedDataTemp.filter((row) => row[0] !== largestValue);
                }
                sortedData = [...sortedData2];
            }
        }
        else if (sortedColumn2 === 'Comments') {
            if (sortDirection === 'asc') {
                sortedDataTemp.sort(function (a, b) {
                    if (a[a.length - 1] === b[b.length - 1]) {
                        return 0;
                    } else if (a[a.length - 1] === "") {
                        return 1;
                    } else if (b[b.length - 1] === "") {
                        return -1;
                    } else {
                        return a[a.length - 1].localeCompare(b[b.length - 1]);
                    }
                });
            }
            else {
                sortedDataTemp.sort(function (a, b) {
                    if (a[a.length - 1] === "" && b[b.length - 1] === "") {
                        return 0;
                    } else if (a[a.length - 1] === "") {
                        return 1;
                    } else if (b[b.length - 1] === "") {
                        return -1;
                    } else {
                        return b[b.length - 1].localeCompare(a[a.length - 1]);
                    }
                });
            }
            var sortedDataTemp = sortedDataTemp.slice();
            while (sortedDataTemp.length > 0) {
                var smallestValue = sortedDataTemp[0][0];
                var group = sortedDataTemp.filter(row => row[0] === smallestValue);

                sortedData2.push(...group);

                sortedDataTemp = sortedDataTemp.filter(row => row[0] !== smallestValue);
            }
            sortedData = [...sortedData2];
        }
        else {
            sortedData.sort((a, b) => {

                let valueA = a[headers.indexOf(sortedColumn2)];
                let valueB = b[headers.indexOf(sortedColumn2)];

                if (sortedColumn2 === 'participant no') {
                    valueA = parseInt(valueA.replace('#', ''));
                    valueB = parseInt(valueB.replace('#', ''));
                    return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
                }
                if (sortedColumn2 === 'categories') {

                }

                if (!isNaN(valueA) && !isNaN(valueB) && valueA !== "" && valueB !== "") {
                    return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
                }


                if (!isNaN(valueA) && valueA !== "") {
                    return -1; // Numbers come first in ascending order
                }
                if (!isNaN(valueB) && valueB !== "") {
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
    }





    return (
        <div className="data-container" ref={dataContainerRef}>
            <table>
                <colgroup>
                    <col style={{ width: '50px' }} />
                    <col style={{ width: '100px' }} />
                    <col style={{ width: '100px' }} />
                    <col style={{ width: '20px' }} />
                </colgroup>
                <thead id='table_header'>
                    <tr>
                        {headers.map((header) => (
                            <th key={'header' + header} onClick={() => handleHeaderClick(header)}>
                                {header} {sortedColumn === header && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                            </th>
                        ))}
                    </tr>
                    {
                        // <tr>
                        //     <th>Participant no</th>
                        //     <th>Categories</th>
                        //     <th>Cards</th>
                        //     <th>Comments</th>
                        // </tr>
                    }
                </thead>
                <tbody>
                    {/* {sortedData.map((item, index, array) => (
                        <tr key={item[0]}>
                            {index === 0 || item[0] !== array[index - 1][0] ? (
                                <td rowSpan={array.filter((el) => el[0] === item[0]).length}>
                                    {item[0]}
                                </td>
                            ) : null}
                            <td>{item[1]}
                            </td>
                            <td>
                                {
                                    Array.isArray(item[2]) ? (
                                        <ul>
                                            {item[2].map((desc, index) => (
                                                <li key={index}>{desc}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        item[2]
                                    )
                                }
                            </td>
                            {index === 0 || item[0] !== array[index - 1][0] ? (
                                <td rowSpan={array.filter((el) => el[0] === item[0]).length}>
                                    {item[3]}
                                </td>
                            ) : null}
                        </tr>
                    ))} */}
                    {
                        sortedData.map((row, index, array) => (
                            <tr key={index}>
                                {index === 0 || row[0] !== array[index - 1][0] ? (
                                    <td rowSpan={array.filter((el) => el[0] === row[0]).length}>
                                        {row[0]}
                                    </td>
                                ) : null}
                                <td>{row[1]}</td>
                                <td>{Array.isArray(row[2]) ? (
                                    <ul>
                                        {row[2].map((desc, index) => (
                                            <li key={index}>{desc}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    row[2]
                                )
                                }</td>
                                <td>{row[3]}</td>
                            </tr>
                        )
                        )



                    }

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