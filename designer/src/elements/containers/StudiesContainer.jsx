import {connect} from 'react-redux';

import Studies from '../components/Studies.jsx';

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

export default connect(mapStateToProps, mapDispatchToProps,)(Studies);
