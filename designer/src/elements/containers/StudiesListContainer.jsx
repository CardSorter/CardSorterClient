"use client"

import {connect} from 'react-redux';
import StudiesList from '../components/StudiesList';

const mapStateToProps = (state) => {
  return {
    studies: state.studies.studies,
    isFetching: state.studies.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const StudiesListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(StudiesList);

export default StudiesListContainer;
