"use client";

import React from "react";
import { useSelector } from "react-redux";
import StateSchema from "reducers/StateSchema";




export default function PlacementFrequencyMatrix() {
    const cards = useSelector((state: StateSchema) => state.study.cards.data);
    const totalParticipants = useSelector((state: StateSchema) =>
     typeof state.study.participants === "object"
       ? state.study.participants.total
       : 1
    );
    const allCategories = Array.from(
        new Set(cards.flatMap((card) => card.category_names))
      );

      return (
        <div className="frequency-placement-matrix">
          <table>
            <thead>
              <tr>
                <th>Card</th>
                {allCategories.map((cat, i) => (
                  <th key={i}>{cat}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cards.map((card, i) => (
                <tr key={i}>
                  <td>{card.name}</td>
                  {allCategories.map((cat, j) => {
                    const index = card.category_names.indexOf(cat);
                    const freq = index !== -1 ? card.frequencies[index] : 0;
                    const percentage = Math.round((freq / totalParticipants) * 100);
                    const colorClass = `color-${Math.min(Math.ceil(percentage / 20) * 20, 100)}`;
    
                    return (
                      <td key={j} className={colorClass}>
                        {percentage > 0 ? `${percentage}%` : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }




  
  