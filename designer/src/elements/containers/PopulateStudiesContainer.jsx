import {connect} from 'react-redux';

import StudiesContainer from '../components/StudiesContainer.jsx';

const mapStateToProps = (state) => {
  console.log('Studies:', state.studies);
  return {
    studies: state.studies.studies,
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
