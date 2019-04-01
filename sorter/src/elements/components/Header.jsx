import React from 'react';

const Header = ({studyID, container, categories, onFinishClick}) => (
  <header>
    <h1 id="logo">Card Sorter</h1>
    <button onClick={() =>
      onFinishClick(studyID, container, categories)}>Finish</button>
  </header>
);

export default Header;
