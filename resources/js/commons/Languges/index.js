import React from "react";
import "./style.scss";
export const Languages = () => {
  return (
    <>
      <div class="dropdown">
        <button
          class="dropdown-toggle d-block m-auto"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
         言語
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">
            Japanese - 日本語
          </a>
          <a class="dropdown-item" href="#">
            English - 英語
          </a>
          <a class="dropdown-item" href="#">
            Tiếng Việt - ベトナム語
          </a>
          <a class="dropdown-item" href="#">
            Tagalog - タガログ語
          </a>
          <a class="dropdown-item" href="#">
            中文 - 中国語
          </a>
          <a class="dropdown-item" href="#">
            閉じる
          </a>
        </div>
      </div>
    </>
  );
};
