import { connect } from 'react-redux';

import Study from '../components/Study.jsx';
import L from '../../localization/LocalizedText';
import * as studyAction from '../../actions/studyPageAction';

/**
 * Finds the proper header strings based on the selected item on the study menu.
 * @param {ReduxState} state
 * @return {String[]} the array containing the headers for the selected item.
 */
function getHeaders(state) {
  //hardcode
  switch (state.study.selectedItem) {
    case 0: {
      return [
        L.text.participantNo,
        L.text.timeTaken,
        L.text.cardsSorted,
        L.text.categoriesCreated,
      ];
    }
    case 5: {
      return [
        L.text.participantNo,
        L.text.categories,
        L.text.cards,
        "Comment",
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
    case 5: {
      return state.study.sorting.data;
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
    description: state.study.description,
    launched: state.study.launchedDate,
    noParticipants: state.study.noParticipants,
    similarityPage: state.study.selectedItem === 3,
    clustersPage: state.study.selectedItem === 4,
    shareUrl: state.study.shareUrl,
    menuValues: {
      selectedNo: state.study.selectedItem,
    },
    graphValues: getGraphValues(state),
    tableValues: {
      headers: getHeaders(state),
      data: getData(state),
    },
    cards: state.study.cards,
    similarityMatrix: state.study.similarityMatrix,
    selectedCards: state.study.selectedCards,
    clusters: state.study.clusters,
    clustersFetching: state.study.clustersFetching,
    showPopup: state.study.popupShowing,
    editPopupOpen: state.study.editPopupOpen,
    editPopupTitle: state.study.title,
    editPopupDescription: state.study.description,
    editPopupIsLive: state.study.isLive,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadStudy: () => dispatch(studyAction.fetchStudy(ownProps.id)),
    loadClusters: () => dispatch(studyAction.fetchClusters(ownProps.id)),
    menuDispatch: {
      onClicks: {
        participant: () => {
          dispatch(studyAction.changeView(0));
        },
        sorting: () => {
          dispatch(studyAction.changeView(5));
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
          dispatch(studyAction.changeView(4));
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
    openPopup: () => {
      dispatch(studyAction.togglePopup(true));
    },
    closePopup: () => {
      dispatch(studyAction.togglePopup(false));
    },
    openEditPopup: () => {
      dispatch(studyAction.toggleEditPopup(true));
    },
    downloadXLSX: () => {
      dispatch(studyAction.downloadXLSX(ownProps.id));
    },
    copyStudy: () => {
      dispatch(studyAction.copyStudy(ownProps.id));
    },
    closeEditPopup: () => {
      dispatch(studyAction.toggleEditPopup(false));
    },
    saveEditPopup: (newTitle, newIsLive, newDescription) => {

      const studyId = ownProps.id;
      dispatch(studyAction.updateStudy(studyId, { title: newTitle, isLive: newIsLive, description: newDescription }));
      dispatch(studyAction.toggleEditPopup(false));
    },
    deleteEditPopup: () => {
      const studyId = ownProps.id;
      dispatch(studyAction.deleteStudy(studyId));
      dispatch(studyAction.toggleEditPopup(false));
    },
  };
};

const StudyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Study);

export default StudyContainer;
