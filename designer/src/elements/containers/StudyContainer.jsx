import {connect} from 'react-redux';

import Study from '../components/Study.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    title: state.study.title,
    isLive: state.study.isLive,
    launched: state.study.launched,
    menuValues: {
      selectedNo: state.study.selectedItem,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    menuDispatch: {
      onClicks: {
        participant: () => {

        },
        cards: () => {

        },
        categories: () => {

        },
        similarityMatrix: () => {

        },
        clusters: () => {

        },
      },
    },
  };
};

const StudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Study);

export default StudyContainer;
