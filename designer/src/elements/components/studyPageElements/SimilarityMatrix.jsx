// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import L from '../../../localization/LocalizedText';

const SimilarityMatrix = ({data, selected, onHover}) => {
  return (
    <div className="similarirty-matrix">
      <table>
        <tbody>
          {data.map((line, index) => (
            <tr key={'line'+index}>
              {line.map((item, index2) => {
                let style = 'color-';
                if (item < 20) {
                  style += 20;
                } else
                if (item < 40) {
                  style += 40;
                } else
                if (item < 60) {
                  style += 60;
                } else
                if (item < 80) {
                  style += 80;
                } else
                if (item <= 100) {
                  style += 100;
                }

                if (index2 === line.length - 1) {
                  // Add different style to the text
                  style = selected[index] ? 'hovered' : '';
                }
                return (
                  <td key={'item'+index+','+index2}
                    className={style} onMouseOver={() =>
                      onHover(index, index2)}
                    // Append the title based on the row/column label
                    title={
                      data[index2][data[index2].length - 1] + ' | ' +
                      line[line.length - 1] + ' ' +
                      L.text.wasGroupedTogetherBy + ' ' +
                      item + '% ' + L.text.ofTheParticipants}>{item}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

SimilarityMatrix.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onHover: PropTypes.func.isRequired,
};

export default SimilarityMatrix;
