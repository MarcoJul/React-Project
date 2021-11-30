import React, { useState } from "react";
import Quotes from "./Quotes/Quotes";
import Search from "./Search/Search";
import SuggestedQuote from "./SuggestedQuote/SuggestedQuote";

const DUMMY_QUOTES = [
  {
    id: "a1",
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  },
  {
    id: "a2",
    text: "You can observe a lot just by watching.",
    author: "Yogi Berra",
  },
  {
    id: "a3",
    text: "A house divided against itself cannot stand.",
    author: "Abraham Lincoln",
  },
  {
    id: "a4",
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang von Goethe",
  },
  {
    id: "a5",
    text: "Fate is in your hands and no one elses",
    author: "Byron Pulsifer",
  },
  {
    id: "a6",
    text: "Be the chief but never the lord.",
    author: "Lao Tzu",
  },
  {
    id: "a7",
    text: "Nothing happens unless first we dream.",
    author: "Carl Sandburg",
  },
  { id: "a8", text: "Well begun is half done.", author: "Aristotle" },
  {
    id: "a9",
    text: "Life is a learning experience, only if you learn.",
    author: "Yogi Berra",
  },
  {
    id: "a10",
    text: "Self-complacency is fatal to progress.",
    author: "Margaret Sangster",
  },
  {
    id: "a11",
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
];

function App() {
  const [quotes, setQuotes] = useState(DUMMY_QUOTES);
  const [searchInput, setSearchInput] = useState("");

  // SEARCH QUOTE - Search.js

  const SearchQuoteHandler = (input) => {
    setSearchInput(input);
  };

  // ADD QUOTE - SuggestedQuote.js & Quotes.js

  const addQuoteHandler = (quote) => {
    setQuotes((previousQuotes) => {
      return [quote, ...previousQuotes];
    });
  };

  const saveQuoteHandler = (quote) => {
    const copiedQuote = {
      id: Math.random().toString(),
      ...quote,
    };
    if (copiedQuote.author === null) copiedQuote.author = "Anonymous";
    addQuoteHandler(copiedQuote);
  };

  // DELETE QUOTE - Quotes.js

  const deleteQuoteHandler = (quoteID) => {
    setQuotes((previousQuotes) => {
      const quotes = previousQuotes.filter((quote) => quote.id !== quoteID);
      return quotes;
    });
  };

  // const searchInputHandler = (input) => {
  //   setFilteredQuotes((previousQuotes) => {
  //     console.log("qui", previousQuotes, input);
  //     const filteredQuotes = previousQuotes.filter(
  //       (quote) =>
  //         quote.text.toLowerCase().includes(input) ||
  //         quote.author.toLowerCase().includes(input)
  //     );
  //     return filteredQuotes;
  //   });
  // };

  return (
    <div>
      <Search onSearchQuote={SearchQuoteHandler} />
      <SuggestedQuote onSaveQuote={saveQuoteHandler} />
      <Quotes
        input={searchInput}
        items={quotes}
        onDeleteQuote={deleteQuoteHandler}
        onSaveQuote={saveQuoteHandler}
      />
    </div>
  );
}

export default App;
