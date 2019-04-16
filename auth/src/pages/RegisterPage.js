import React, {Component} from 'react';

import '../App.css';
import RegisterContainer from '../elements/containers/RegisterContainer.jsx';

class RegisterPage extends Component {
  render() {
    return (
      <main className="App">
        <RegisterContainer/>
      </main>
    );
  }
}

export default RegisterPage;
