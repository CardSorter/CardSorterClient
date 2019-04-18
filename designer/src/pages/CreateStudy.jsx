// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line no-unused-vars
import Header from '../elements/containers/HeaderContainer.jsx';
// eslint-disable-next-line no-unused-vars
import PopulateCreateStudyContainer 
  from '../elements/containers/PopulateCreateStudyContainer.jsx';
import demoImage from '../demo/profile.jpeg';

/**
 * @return {ReactDOM} The study creation page.
 */
const CreateStudy = ({history}) => {
  return (
    <main>
      <Header username='John' profilePic={demoImage}/>
      <PopulateCreateStudyContainer history={history}/>
    </main>);
};

export default CreateStudy;
