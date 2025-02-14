import React from 'react';

import Header from '../elements/containers/HeaderContainer';
import StudyContainer from '../elements/containers/StudyContainer';

/**
 * @return {ReactDOM} The study page.
 */
const StudyPage = ({ history, match }) => {
  return (
    <main>
      <Header showBackButton={true} />
      <StudyContainer id={match.params.id} />
    </main>);
};

export default StudyPage;
