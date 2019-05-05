// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line no-unused-vars
import Header from '../elements/containers/HeaderContainer.jsx';
// eslint-disable-next-line no-unused-vars
import StudyCreationContainer
  from '../elements/containers/StudyCreationContainer.jsx';

/**
 * @return {ReactDOM} The study creation page.
 */
const CreateStudy = ({history}) => {
  return (
    <main>
      <Header showBackButton={true}/>
      <StudyCreationContainer history={history}/>
    </main>);
};

export default CreateStudy;
