import React from 'react';

import Header from '../elements/components/Header.jsx';
import PopulateCreateStudyContainer 
  from '../elements/containers/PopulateCreateStudyContainer.jsx';
import demoImage from '../demo/profile.jpeg';

/**
 * @return {ReactDOM} The study creation page.
 */
const CreateStudy = ({page}) => {
  console.log(page);
  return (
    <main>
      <Header username='John' profilePic={demoImage}/>
      <PopulateCreateStudyContainer currentPage={page}/>
    </main>);
};

export default CreateStudy;
