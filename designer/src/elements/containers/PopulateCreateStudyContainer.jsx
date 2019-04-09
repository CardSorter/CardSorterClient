import {connect} from 'react-redux';

import StudyCreationContainer from '../components/StudyCreationContainer.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    currentPage: ownProps.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    page1: () =>{
      return {
        onNext: (title, desc, url) =>{
        },
        onPrev: (title, desc, url) => {
        },
      };
    },
    page2: () =>{
      return {
        onNext: (title, desc, url) =>{
        },
        onPrev: (title, desc, url) => {
        },
      };
    },
    page3: () =>{
      return {
        onNext: (title, desc, url) =>{
        },
        onPrev: (title, desc, url) => {
        },
      };
    },
  };
};

const PopulateCreateStudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StudyCreationContainer);

export default PopulateCreateStudyContainer;
