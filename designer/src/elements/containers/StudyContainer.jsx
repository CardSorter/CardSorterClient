import {connect} from 'react-redux';

import Study from '../components/Study.jsx';
import L from '../../localization/LocalizedText';
import * as studyAction from '../../actions/studyPageAction';

/**
 * Finds the proper header strings based on the selected item on the study menu.
 * @param {ReduxState} state
 * @return {String[]} the array containing the headers for the selected item.
 */
function getHeaders(state) {
  switch (state.study.selectedItem) {
    case 0: {
      return [
        L.text.participantNo,
        L.text.timeTaken,
        L.text.cardsSorted,
        L.text.categoriesCreated,
      ];
    }
    case 1: {
      return [
        L.text.card,
        L.text.categoriesNo,
        L.text.categories,
        L.text.frequency,
      ];
    }
    case 2: {
      return [
        L.text.category,
        L.text.cardsNo,
        L.text.cards,
        L.text.frequency,
        L.text.participants,
      ];
    }
    default: {
      return [];
    }
  }
}

/**
 * Finds the proper graph values based on the selected item on the study menu.
 * @param {ReduxState} state
 * @return {[]} the array containing the values for the graph element.
 */
function getGraphValues(state) {
  switch (state.study.selectedItem) {
    case 0: {
      return {
        percentage: state.study.participants.completion,
        sub: state.study.participants.completed,
        total: state.study.participants.total,
        entity: L.text.users,
        title: L.text.completion,
        action: L.text.completedTheStudy,
      };
    }
    case 1: {
      return {
        percentage: state.study.cards.average,
        sub: state.study.cards.sorted,
        total: state.study.cards.total,
        entity: L.text.cards,
        title: L.text.averageSort,
        action: L.text.wereSorterInAverage,
      };
    }
    case 2: {
      return {
        percentage: state.study.categories.similarity,
        sub: state.study.categories.similar,
        total: state.study.categories.total,
        entity: L.text.categories,
        title: L.text.similarity,
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
function getData(state) {
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

const mapStateToProps = (state) => {
  return {
    isFetching: state.study.isFetching,
    title: state.study.title,
    isLive: state.study.isLive,
    launched: state.study.launchedDate,
    noParticipants: state.study.noParticipants,
    similarityPage: state.study.selectedItem === 3,
    shareUrl: state.study.shareUrl,
    menuValues: {
      selectedNo: state.study.selectedItem,
    },
    graphValues: getGraphValues(state),
    tableValues: {
      headers: getHeaders(state),
      data: getData(state),
    },
    similarityMatrix: state.study.similarityMatrix,
    selectedCards: state.study.selectedCards,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadStudy: () => dispatch(studyAction.fetchStudy(ownProps.id)),
    menuDispatch: {
      onClicks: {
        participant: () => {
          dispatch(studyAction.changeView(0));
        },
        cards: () => {
          dispatch(studyAction.changeView(1));
        },
        categories: () => {
          dispatch(studyAction.changeView(2));
        },
        similarityMatrix: () => {
          dispatch(studyAction.changeView(3));
        },
        clusters: () => {
        },
      },
    },
    tableDispatch: {

    },
    similarityHover: (index1, index2) => {
      dispatch(studyAction.changeHoveredCards(index1, index2));
    },
    copyUrl: (urlRef) => {
      urlRef.current.select();
      document.execCommand('copy');
    },
  };
};

const StudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Study);

export default StudyContainer;
