import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import App from './App';

const AppContainer = () => {
    return (
        <DragDropContextProvider backend={HTML5Backend}>
            <App />
        </DragDropContextProvider>
    );
}

export default AppContainer;
