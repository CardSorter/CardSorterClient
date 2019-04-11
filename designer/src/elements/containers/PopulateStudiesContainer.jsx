import {connect} from 'react-redux';

import StudiesContainer from '../components/StudiesContainer.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    studies: state.studies.studies,
    onCreateClick: () => {
      ownProps.history.push('./create/1');
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const PopulateStudiesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StudiesContainer);

export default PopulateStudiesContainer;
