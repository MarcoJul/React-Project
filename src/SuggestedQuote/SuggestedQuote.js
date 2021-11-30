import React, { useState } from "react";
// import { useMediaQuery } from "react-responsive";

import { useAsync } from "react-async";
import { ReactComponent as DismissIcon } from "./ICN_Dismiss.svg";
import { ReactComponent as SaveIcon } from "./ICN_Add.svg";
import { ReactComponent as QuoteMarks } from "./ICN_QuoteMarks.svg";
import "./SuggestedQuote.css";

// CONSTANT VALUES

const API_URL = "https://type.fit/api/quotes";
const randomIndex = Math.trunc(Math.random() * 1643);
let html = "";

// ASYNC CALL

const loadPlayer = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

////////////
// COMPONENT

const SuggestedQuote = (props) => {
  const { data, error, isPending } = useAsync({ promiseFn: loadPlayer });
  const [isShown, setIsShown] = useState(true);
  const [isHover, setIsHover] = useState(false);

  // CASES

  // const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  if (isPending)
    return (
      <div className="container">
        <div className="loading-screen">
          <h2 className="loading-text">Suggested Quote Loading...</h2>
        </div>
      </div>
    );
  if (error) return;

  const suggested = data[randomIndex];

  const saveQuote = () => {
    props.onSaveQuote(suggested);
    setIsShown(false);
  };

  const deleteSuggestedQuote = () => {
    setIsShown(false);
  };

  if (isShown)
    html = (
      <div className="container">
        <div
          className="suggested-quote"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <QuoteMarks className="quotemarks" />
          <div className="suggested-flex">
            <div className="text-box">
              <div className="title"></div>
              <div>
                <p className="text-quote">{suggested.text}</p>
                <p className="author-quote">
                  {suggested.author ? suggested.author : "Anonymous"}
                </p>
              </div>
            </div>
            {isHover ? (
              <div className="suggested-icons">
                <div className="icon-container-suggested__expanded">
                  <span className="button-label">Add</span>
                  <SaveIcon
                    onClick={saveQuote}
                    className="save-icon__expanded"
                  />
                </div>
                <div
                  className="icon-container-suggested__expanded"
                  onClick={deleteSuggestedQuote}
                >
                  <span className="button-label">Dismiss</span>
                  <DismissIcon className="delete-icon__expanded" />
                </div>
              </div>
            ) : (
              <div className="suggested-icons">
                <div className="icon-container">
                  <SaveIcon onClick={saveQuote} className="save-icon" />
                </div>
                <div className="icon-container">
                  <DismissIcon
                    onClick={deleteSuggestedQuote}
                    className="delete-icon"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  else {
    html = (
      <div className="blank container">
        <p>Need some inspiration?</p>
        <div className="action">
          <p>Discover a new Quote</p>
          <SaveIcon id="reset-btn" onClick={() => setIsShown(true)} />
        </div>
      </div>
    );
  }

  return html;
};

export default SuggestedQuote;

// <div>
//   <Card className="suggested-quote">
//     <div>
//       <p className="text-quote">"{}"</p>
//       <p className="author-quote">- {}</p>
//     </div>
//   </Card>
// </div>

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// const getJSON = async function (url) {
//   try {
//     const fetchQuote = fetch(url);
//     const res = await Promise.race([fetchQuote, timeout(10)]);
//     const quoteData = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return quoteData;
//   } catch (err) {
//     throw err;
//   }
// };

// const loadSuggestion = async function () {
//   const API_URL = "https://type.fit/api/quotes";
//   const sugQuote = await getJSON(API_URL);
//   const randomIndex = Math.trunc(Math.random() * 1643);
//   randomQuote = sugQuote[randomIndex].text;
//   console.log(randomQuote);
// };

// loadSuggestion();
