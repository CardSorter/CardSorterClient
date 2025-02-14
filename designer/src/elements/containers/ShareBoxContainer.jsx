"use client"

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ShareBox from '../components/ShareBox.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    url: ownProps.url,
    text: ownProps.text,
    onCopy: (urlRef) => {
      const input = document.createElement('input');
      input.value = urlRef.current.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const ShareBoxcontainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareBox);

ShareBoxcontainer.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default ShareBoxcontainer;
