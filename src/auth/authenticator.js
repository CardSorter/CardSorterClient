/**
 * Handles the jws tokens and ensures the redirection in case of not validity.
 */
class Authenticator {
  /**
   * Gets the auth token from the cookie send by the server during
   * the login/registration phase.
   * @return {String} the jws auth token.
   */
  getToken() {
    return this.getCookie('auth_token');
  }
}


Authenticator.prototype.getCookie = function(cname) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export default new Authenticator();
