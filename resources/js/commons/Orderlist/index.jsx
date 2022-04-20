import React from "react";

const OrderList = ({ data, arialLevel, liStyle, spanStyle }) => {
  return (
    <ol>
      {data.map((liData, index) => (
        <li key={index} style={liStyle} aria-level={arialLevel}>
          <span style={spanStyle}>{liData.title}</span>
        </li>
      ))}
    </ol>
  );
};

export default OrderList;
