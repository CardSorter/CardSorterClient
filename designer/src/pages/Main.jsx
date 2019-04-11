import React from 'react';

import '../App.css';
import Header from '../elements/components/Header.jsx';
import PopulateStudiesContainer 
  from '../elements/containers/PopulateStudiesContainer.jsx';
import Filters from '../elements/components/Filters.jsx';
import demoImage from '../demo/profile.jpeg';


/**
 * The main page.
 * @return {ReactDOM}
 */
const Main = ({history}) =>
  (<main>
    <Header username='John' profilePic={demoImage}/>
    <Filters ongoing={true} completed={true} />
    <PopulateStudiesContainer history={history}/>
  </main>);

export default Main;
