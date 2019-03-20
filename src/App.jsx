import React, {Component} from 'react';
import PopulateContainer from './elements/containers/PopulateContainer.jsx';
import PopulateBoard from './elements/containers/PopulateBoard.jsx';
import Header from './elements/components/Header.jsx';
import './App.css';

/**
 * App route
 */
class App extends Component {
  /**
   * React render
   * @return {Component}
   */
  render() {
    return (
      <div className="App">
        <Header />
        <div id="main-panel">
          <PopulateContainer />
          <PopulateBoard />
        </div>
      </div>
    );
  }
}

export default App;
