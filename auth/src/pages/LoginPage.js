// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';

import '../App.scss';
// eslint-disable-next-line no-unused-vars
import LoginContainer from '../elements/containers/LoginContainer.jsx';

/**
 * The login page.
 */
class LoginPage extends Component {
  /**
   * React render function.
   * @return {ReactDOM}
   */
  render() {
    return (
      <main className="App">
        <div id="logo"><p>CardSorter</p></div>
        <LoginContainer history={this.props.history}/>
      </main>
    );
  }
}

export default LoginPage;
