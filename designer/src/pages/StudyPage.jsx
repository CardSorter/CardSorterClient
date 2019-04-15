import React from 'react';

import Header from '../elements/components/Header.jsx';
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
