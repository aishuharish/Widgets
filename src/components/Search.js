import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programming");
  const [results, setResults] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  //console.log(results);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  /*
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };

    //to avoid delay for the first api call, we are using the below condition
    if (term && !results.length) {
      search();
    } else {
      //to avoid calling api for each character entered, we are using timeout
      //if the state is not changed for 2s, we call the api for the search term
      //if the state is changed, we cancel/clear the previous timer and set a new timer

      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 2000);

      //useEffect return function is called when the component rerenders the next time
      //timer set previously is cleared by this function.
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term, results.length]);
  */

  const renderedList = results.map((result) => (
    <div key={result.pageid} className="item">
      <div className="right floated content">
        <a
          className="ui button"
          href={`https://en.wikipedia.org?curid=${result.pageid}`}
        >
          Go
        </a>
      </div>
      <div className="content">
        <div className="header">{result.title}</div>
        <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
      </div>
    </div>
  ));

  return (
    <div className="ui form">
      <div className="ui field">
        <label>Enter search term:</label>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <div className="ui celled list">{renderedList}</div>
    </div>
  );
};

export default Search;
