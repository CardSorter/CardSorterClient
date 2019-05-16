// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const Header = ({studyID, container, categories,
  timeStarted, onFinishClick, onCommentClick, comment}) => (
  <header>
    <h1 id="logo">Card Sorter</h1>
    <button className="btn--secondary" onClick={onCommentClick}>
      <p>Add a comment</p>
    </button>
    <button className="btn--main" onClick={() =>
      onFinishClick(studyID, container, categories,
          timeStarted, comment)}><p>Finish</p></button>
  </header>
);

Header.propTypes = {
  studyID: PropTypes.string,
  container: PropTypes.array,
  categories: PropTypes.object,
  onFinishClick: PropTypes.func.isRequired,
  comment: PropTypes.string,
};

export default Header;
