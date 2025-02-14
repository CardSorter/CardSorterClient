import {connect} from 'react-redux';

import CreateStudy from './CreateStudy';

const mapStateToProps = (state, ownProps) => {
  return {
    history: ownProps.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const CreateStudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateStudy);

export default CreateStudyContainer;
