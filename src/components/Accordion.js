import React, { useState } from "react";

const Accordion = ({ items }) => {
  const [activeindex, setActiveIndex] = useState(null);
  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  const renderedItems = items.map((item, index) => {
    const active = activeindex === index ? "active" : "";

    return (
      <React.Fragment key={item.title}>
        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p
          // className="transition visible"
          // style={{ display: "block !important" }}
          >
            {item.content}
          </p>
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className="ui styled accordion">
      {renderedItems}
      {/* <h1>{activeindex}</h1> */}
    </div>
  );
};

export default Accordion;
