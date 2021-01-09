import {connect} from 'react-redux';

import StudiesContainer from '../components/StudiesContainer.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    studies: state.studies.studies,
    onStudyClick: (id) => {
      ownProps.history.push('./study/'+id);
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const PopulateStudiesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StudiesContainer);

export default PopulateStudiesContainer;
