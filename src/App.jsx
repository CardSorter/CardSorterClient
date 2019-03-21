import React, {Component} from 'react';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="App">
          <Header />
          <div id="main-panel">
            <PopulateContainer />
            <PopulateBoard />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default App;
