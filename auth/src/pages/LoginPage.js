import React, {Component} from 'react';

import '../App.css';
import LoginContainer from '../elements/containers/LoginContainer.jsx';

class LoginPage extends Component {
  render() {
    return (
      <main className="App">
        <LoginContainer/>
      </main>
    );
  }
}

export default LoginPage;
