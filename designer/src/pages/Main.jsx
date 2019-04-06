import React, {Component} from 'react';

import '../App.css';
import Header from '../elements/components/Header.jsx';
import PopulateStudiesContainer 
  from '../elements/containers/PopulateStudiesContainer.jsx';
import Filters from '../elements/components/Filters.jsx';
import demoImage from '../demo/profile.jpeg';

/**
 *
 */
class Main extends Component {
  /**
   * @return {ReactDOM}
   */
  render() {
    return (
      <main>
        <Header username='John' profilePic={demoImage}/>
        <Filters ongoing={true} completed={true} />
        <PopulateStudiesContainer />
      </main>
    );
  }
}

export default Main;
