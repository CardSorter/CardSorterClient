import 'babel-polyfill'; // Ensure all polyfills are present

import React, {Component} from 'react';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import PopulateContainer from './elements/containers/PopulateContainer.jsx';
import PopulateBoard from './elements/containers/PopulateBoard.jsx';
import PopulateHeader from './elements/containers/PopulateHeader.jsx';
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
          <PopulateHeader />
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
