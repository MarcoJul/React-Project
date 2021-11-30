import React from "react";
import { useMediaQuery } from "react-responsive";

import QuoteItem from "./QuoteItem";
import Masonry from "react-masonry-css";
import QuoteForm from "../newQuote/QuoteForm";
import QuoteFormMobile from "../newQuote/QuoteFormMobile";
import "./QuoteList.css";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  768: 1,
};

const QuoteList = (props) => {
  const addQuoteHandler = (input) => {
    props.onSaveQuote(input);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const formComponent = !isMobile ? (
    <QuoteForm onAddQuote={addQuoteHandler} key="001" />
  ) : (
    <QuoteFormMobile onAddQuote={addQuoteHandler} key="001" />
  );

  const newQuote =
    props.onSearch !== ""
      ? [
          props.items.map((quote) => (
            <QuoteItem
              key={quote.id}
              id={quote.id}
              text={quote.text}
              author={quote.author}
              onDelete={props.onDeleteQuote}
            />
          )),
        ]
      : [
          formComponent,
          ...props.items.map((quote) => (
            <QuoteItem
              key={quote.id}
              id={quote.id}
              text={quote.text}
              author={quote.author}
              onDelete={props.onDeleteQuote}
            />
          )),
        ];

  return (
    <div className="container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {newQuote}
      </Masonry>
    </div>
  );
};

export default QuoteList;
