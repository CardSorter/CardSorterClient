// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';

import '../App.scss';
// eslint-disable-next-line no-unused-vars
import RegisterContainer from '../elements/containers/RegisterContainer.jsx';

/**
 * The register page.
 */
class RegisterPage extends Component {
  /**
   * React render function.
   * @return {ReactDOM}
   */
  render() {
    return (
      <main className="App">
        <span id="logo"><p>CardSorter</p></span>
        <RegisterContainer history={this.props.history}/>
      </main>
    );
  }
}

export default RegisterPage;
