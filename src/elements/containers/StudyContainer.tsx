import {connect} from 'react-redux';

import Study, {StudyDispatch, StudyState} from '../components/Study';
import L from '../../localization/LocalizedText';
import * as studyAction from '../../actions/studyPageAction';
import {CardSorterState} from "../../State";
import {Dispatch} from "redux";

/**
 * Finds the proper graph values based on the selected item on the study menu.
 * @param {ReduxState} state
 * @return {[]} the array containing the values for the graph element.
 */
function getGraphValues(state: CardSorterState) {
  switch (state.study.selectedItem) {
    case 0: {
      return {
        percentage: state.study.participants.completion,
        sub: state.study.participants.completed,
        total: state.study.participants.total,
        // @ts-ignore
        entity: L.text.users,
        // @ts-ignore
        title: L.text.completion,
        // @ts-ignore
        action: L.text.completedTheStudy,
      };
    }
    case 1: {
      return {
        percentage: state.study.cards.average,
        sub: state.study.cards.sorted,
        total: state.study.cards.total,
        // @ts-ignore
        entity: L.text.cards,
        // @ts-ignore
        title: L.text.averageSort,
        // @ts-ignore
        action: L.text.wereSorterInAverage,
      };
    }
    case 2: {
      return {
        percentage: state.study.categories.similarity,
        sub: state.study.categories.similar,
        total: state.study.categories.total,
        // @ts-ignore
        entity: L.text.categories,
        // @ts-ignore
        title: L.text.similarity,
        // @ts-ignore
        action: L.text.couldBeMergedInto,
      };
    }
    default: {
      return {};
    }
  }
}

/**
 * Finds the proper data based on the selected item on the study menu.
 * @param {ReduxState} state
 * @return {String[]} the array containing the arrays of the data for
 * the selected item.
 */
function getData(state: CardSorterState) {
  switch (state.study.selectedItem) {
    case 0: {
      return state.study.participants.data;
    }
    case 1: {
      return state.study.cards.data;
    }
    case 2: {
      return state.study.categories.data;
    }
    default: {
      return {};
    }
  }
}

const mapStateToProps = (state: CardSorterState): StudyState => {
  return {
    isFetching: state.study.isFetching,
    title: state.study.title,
    isLive: state.study.isLive,
    noParticipants: state.study.noParticipants,
    similarityPage: state.study.selectedItem === 3,
    clustersPage: state.study.selectedItem === 4,
    shareUrl: state.study.shareUrl,
    graphValues: getGraphValues(state),
    tableValues: {
      data: getData(state),
    },
    similarityMatrix: state.study.similarityMatrix,
    selectedCards: state.study.selectedCards,
    clusters: state.study.clusters,
    clustersFetching: state.study.clustersFetching,
    showPopup: state.study.popupShowing,
    abandonedNo: state.study.participants.total - state.study.participants.completed,
    completedNo: state.study.participants.completed,
  };
};

export interface StudyProps {
  id: string,
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: StudyProps): StudyDispatch => {
  return {
    loadStudy: () => dispatch(studyAction.fetchStudy(ownProps.id)),
    loadClusters: () => dispatch(studyAction.fetchClusters(ownProps.id)),
    similarityHover: (index1, index2) => {
      dispatch(studyAction.changeHoveredCards(index1, index2));
    },
    openPopup: () => {
      dispatch(studyAction.togglePopup(true));
    },
    closePopup: () => {
      dispatch(studyAction.togglePopup(false));
    },
  };
};

const StudyContainer = connect(mapStateToProps, mapDispatchToProps)(Study);

export default StudyContainer;
