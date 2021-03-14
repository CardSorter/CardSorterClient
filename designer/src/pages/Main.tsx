import React from 'react';
import Header from '../elements/containers/HeaderContainer.jsx';
import StudiesContainer from '../elements/containers/StudiesContainer.jsx';
import Filters from '../elements/components/Filters.jsx';
import {RouteComponentProps} from 'react-router-dom';

/**
 * The main page.
 * @return {ReactDOM}
 */
const Main: React.FC<RouteComponentProps> = ({history}) => {

  return (
    <main>
      <Header showBackButton={false}/>
      <Filters ongoing={true} completed={true} />
      <StudiesContainer history={history}/>
    </main>
  );
}

export default Main;
