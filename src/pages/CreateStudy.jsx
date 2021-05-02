import React from 'react';
import Header from '../elements/containers/HeaderContainer';
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
