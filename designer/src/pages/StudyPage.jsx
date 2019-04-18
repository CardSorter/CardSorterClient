// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line no-unused-vars
import Header from '../elements/containers/HeaderContainer.jsx';
// eslint-disable-next-line no-unused-vars
import StudyContainer from '../elements/containers/StudyContainer.jsx';
import demoImage from '../demo/profile.jpeg';

/**
 * @return {ReactDOM} The study page.
 */
const StudyPage = ({history, match}) => {
  return (
    <main>
      <Header username='John' profilePic={demoImage}/>
      <StudyContainer id={match.params.id}/>
    </main>);
};

export default StudyPage;
