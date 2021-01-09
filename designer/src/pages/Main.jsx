// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line no-unused-vars
import Header from '../elements/containers/HeaderContainer.jsx';
// eslint-disable-next-line no-unused-vars
import PopulateStudiesContainer
  from '../elements/containers/PopulateStudiesContainer.jsx';
// eslint-disable-next-line no-unused-vars
import Filters from '../elements/components/Filters.jsx';


/**
 * The main page.
 * @return {ReactDOM}
 */
const Main = ({history}) =>
  (<main>
    <Header showBackButton={false}/>
    <Filters ongoing={true} completed={true} />
    <PopulateStudiesContainer history={history}/>
  </main>);

export default Main;
