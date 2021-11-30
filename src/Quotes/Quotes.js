import React from "react";
import QuoteList from "./QuoteList";

const Quotes = (props) => {
  const arrInputs = props.input.includes(" ")
    ? props.input.split(" ")
    : [props.input];

  let filteredQuotes = [];

  const filterSearch = (words) =>
    props.items.filter((s) =>
      words.some(
        (w) =>
          s.text.toLowerCase().includes(w.toLowerCase()) ||
          s.author.toLowerCase().includes(w.toLowerCase())
      )
    );

  const trimArr = arrInputs.join(" ").trim().split(" ");

  if (arrInputs.length > 0) {
    filteredQuotes = filterSearch(trimArr);
  } else filteredQuotes = props.items;

  const search = props.input;

  const onSaveQuote = (input) => {
    props.onSaveQuote(input);
  };

  return (
    <div>
      <QuoteList
        items={filteredQuotes}
        onDeleteQuote={props.onDeleteQuote}
        onSaveQuote={onSaveQuote}
        onSearch={search}
      />
    </div>
  );
};

export default Quotes;
