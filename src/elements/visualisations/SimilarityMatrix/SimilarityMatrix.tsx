"use client"

import React, {useCallback, useState} from 'react';
import {useTranslations} from "next-intl";
import styles from "./SimilarityMatrix.module.scss";

interface SimilarityMatrixProps {
  data: number[][];
}

const SimilarityMatrix: React.FC<SimilarityMatrixProps> = ({data}) => {
  const t = useTranslations("StudyPage");
  const [hoveredItem, setHoveredItem] = useState<{row?: number, col?: number}>({});

  const onHover = (row: number | undefined, col: number | undefined) => {
    setHoveredItem(prev => (
      prev.row === row && prev.col === col ? prev : {row, col}
    ));
  }

  const getCellStyle = useCallback((item: number, row: number, col: number, line: number[]) => {
    let style = "";
    if (item < 20) style = styles.color20;
    else if (item < 40) style = styles.color40;
    else if (item < 60) style = styles.color60;
    else if (item < 80) style = styles.color80;
    else if (item <= 100) style = styles.color100;

    if (hoveredItem && col === line.length - 1 && (row === hoveredItem.row || col === hoveredItem.col)) {
      style = `${style} ${styles.hovered}`;
    }

    return style;
  }, [hoveredItem]);

  const getTitle = useCallback((data: number[][], line: number[], col: number, item: number) => {
    return `${data[col][data[col].length - 1]} | ${line[line.length - 1]} ${t("grouped together by")} ${item}% ${t("of the participants")}`;
  }, [t]);

  return (
    <div className={styles.similarityMatrix}>
      <table>
        <tbody>
          {data.map((line, row) => (
            <tr key={`line-${row}`}>
              {line.map((item, col) => (
                <td
                  key={`item-${row}-${col}`}
                  className={getCellStyle(item, row, col, line)}
                  onMouseOver={() => onHover(row, col)}
                  onMouseOut={() => onHover(undefined, undefined)}
                  title={getTitle(data, line, col, item)}
                >
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimilarityMatrix;
