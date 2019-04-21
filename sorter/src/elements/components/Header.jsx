// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import ThanksScreen from '../components/ThanksScreen.jsx';

const Header = ({studyID, container, categories, onFinishClick,
  renderThanks, thanksMessage}) => {
  let render;

  if (renderThanks) {
    render = (
      <main>
        <ThanksScreen message={thanksMessage}/>
      </main>);
  } else {
    render = (
      <header>
        <h1 id="logo">Card Sorter</h1>
        <button onClick={() =>
          onFinishClick(studyID, container, categories)}>Finish</button>
      </header>
    );
  }
  return render;
};

Header.propTypes = {
  studyID: PropTypes.string.isRequired,
  container: PropTypes.array,
  categories: PropTypes.object,
  onFinishClick: PropTypes.func.isRequired,
  renderThanks: PropTypes.bool,
  thanksMessage: PropTypes.string,
};

export default Header;
