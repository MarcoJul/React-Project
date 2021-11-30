import React, { useState } from "react";
import Card from "../UI/Card";
import { ReactComponent as CopyIcon } from "./ICN_Copy.svg";
import { ReactComponent as TrashIcon } from "./ICN_Trash.svg";
import { ReactComponent as DoneIcon } from "./ICN_Done.svg";

import "./QuoteItem.css";

const QuoteItem = (props) => {
  const [isHover, setIsHover] = useState(false);

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  const copyHandler = () => {
    const done = document.getElementById(props.id);
    const copyQuote = `${props.text}\n(${props.author})`;
    navigator.clipboard.writeText(copyQuote);
    done.style.transform = "translateY(50px)";
  };

  return (
    <Card className="card">
      <div
        className="inner-box"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="text-box__list">
          <p className="text-quote__list">{props.text}</p>
          <p className="author-quote"> {props.author}</p>
        </div>
        {isHover ? (
          <div className="icons__expanded">
            <div
              className="icon-container-list__expanded"
              onClick={copyHandler}
            >
              <div className="action-done" id={props.id}>
                <span className="button-label">Copied!</span>
                <DoneIcon className="save-icon__expanded" />
              </div>
              <span className="button-label">Copy</span>
              <CopyIcon className="save-icon__expanded" />
            </div>
            <div
              className="icon-container-list__expanded"
              onClick={deleteHandler}
            >
              <span className="button-label">Dismiss</span>
              <TrashIcon className="delete-icon__expanded" />
            </div>
          </div>
        ) : (
          <div className="icons">
            <div className="icon-container">
              <CopyIcon onClick={copyHandler} />
            </div>
            <div className="icon-container">
              <TrashIcon onClick={deleteHandler} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuoteItem;
