import React from "react";
import { Link } from "react-router-dom";

const Board = ({ boardItems }) => {
  return (
    <div className="board-container">
      {boardItems.map((item, index) => (
        <div
          key={index}
          className={item.disable ? "board-item block-disabled" : "board-item"}
        >
          {item.type === "a_tag" ? (
            <a
              target="_blank"
              href={item.link}
              className="item"
              title={item.link}
            >
              <div className="icon">
                <img src={item.imageUrl} alt="" />
              </div>
              <div className="desc">
                <h3 className="tit">{item.title}</h3>
              </div>
            </a>
          ) : (
            <Link
              target="_blank"
              to={item.link}
              className="item"
              title={item.link}
            >
              <div className="icon">
                <img src={item.imageUrl} alt="" />
              </div>
              <div className="desc">
                <h3 className="tit">{item.title}</h3>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
