import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as BtnResetIcon } from "./ICN_Reset.svg";
import { ReactComponent as BtnAddQuote } from "./ICN_Add.svg";

import "./QuoteForm.css";

const QuoteForm = (props) => {
  const [enteredQuote, setEnteredQuote] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isHover, setIsHover] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const quoteChangeHandler = (event) => {
    setIsValid(true);
    setEnteredQuote(event.target.value);
  };

  const authorChangeHandler = (event) => {
    setEnteredAuthor(event.target.value);
  };

  const saveQuoteDataHandler = (enteredQuoteData) => {
    const quoteData = {
      id: Math.random().toString(),
      ...enteredQuoteData,
    };
    props.onAddQuote(quoteData);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const quoteData = {
      text: enteredQuote,
      author: enteredAuthor ? enteredAuthor : "Anonymous",
    };
    if (enteredQuote.trim().length === 0) {
      setIsValid(false);
      return;
    }

    if (!quoteData.text) {
    } else {
      saveQuoteDataHandler(quoteData);
      setEnteredQuote("");
      setEnteredAuthor("");
    }
  };

  const resetHandler = () => {
    setEnteredQuote("");
    setEnteredAuthor("");
  };

  // if (isMobile) {
  //   console.log("mobile");
  // } else {
  //   console.log("desktop");
  // }

  // let mobile = false;

  // if (window.innerWidth < 767) mobile = true;

  // console.log(mobile);

  return (
    <div>
      <form
        onSubmit={submitHandler}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={isMobile ? "fixed" : ""}
      >
        <div>
          <div className="new-quote_text">
            <label>Add a new quote</label>
            <textarea
              type="text"
              placeholder={
                isValid
                  ? "Type here your new quote..."
                  : "Quote cannot be empty"
              }
              value={enteredQuote}
              onChange={quoteChangeHandler}
              className={isValid ? "" : "invalid"}
            />
          </div>
          <div className="new-quote_author">
            <label>Author</label>
            <input
              type="text"
              placeholder="Type the author here"
              value={enteredAuthor}
              onChange={authorChangeHandler}
            />
            <p className="author-message">Leave this blank if unknown.</p>
          </div>
        </div>
        {!isHover ? (
          <div className="new-quote_actions">
            <div className="icon-container">
              <BtnResetIcon
                className="cancel-quote"
                type="button"
                onClick={resetHandler}
              />
            </div>
            <button id="btn-add" className="icon-container">
              <BtnAddQuote className="add-quote" type="button" />
            </button>
          </div>
        ) : (
          <div className="icons-form__expanded">
            <div
              className="icon-container-form__expanded"
              onClick={resetHandler}
            >
              <span className="button-label">Reset</span>
              <BtnResetIcon className="cancel-icon__expanded" />
            </div>
            <div className="icon-container-form__expanded">
              <button id="btn-add__expanded" className="btn-add__expanded">
                <span className="button-label">Add</span>
                <BtnAddQuote className="add-icon__expanded" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuoteForm;
