import 'babel-polyfill'; // Ensure all polyfills are present

// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// eslint-disable-next-line no-unused-vars
import ListContainer from './elements/containers/ListContainer.jsx';
// eslint-disable-next-line no-unused-vars
import BoardContainer from './elements/containers/BoardContainer.jsx';
// eslint-disable-next-line no-unused-vars
import HeaderContainer from './elements/containers/HeaderContainer.jsx';
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
          <HeaderContainer />
          <div id="main-panel">
            <ListContainer />
            <BoardContainer />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default App;
