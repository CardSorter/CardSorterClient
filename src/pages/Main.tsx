import React from 'react';
import Header from '../elements/containers/HeaderContainer';
import StudiesContainer from '../elements/containers/StudiesContainer';
import Filters, {FilterTypes} from '../elements/components/Filters';
import {RouteComponentProps} from 'react-router-dom';

/**
 * The main page.
 * @return {ReactDOM}
 */
const Main: React.FC<RouteComponentProps> = () => {

  return (
    <>
      <Header showBackButton={false}/>
      <main>
        <Filters currentFilters={[FilterTypes.COMPLETED, FilterTypes.ONGOING]} />
        <StudiesContainer />
      </main>
    </>
  );
}

export default Main;
