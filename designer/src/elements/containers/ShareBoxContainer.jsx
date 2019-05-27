import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ShareBox from '../components/ShareBox.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    url: ownProps.url,
    text: ownProps.text,
    onCopy: (urlRef) => {
      urlRef.current.select();
      document.execCommand('copy');
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
