import * as studyActions from '../actions/studyPageAction';
import * as StatusEnum from '../static/StatusEnum';
import * as XLSX from 'xlsx';
/**
 *
 * @param {stateSchema} state
 * @param {studyPageAction} action
 * @return {stateSchema}
 */
export default function studyPageReducer(state={}, action) {
  switch (action.type) {
    case studyActions.COPY_STUDY: {
    
    localStorage.setItem('newTitle', state.title);
    localStorage.setItem('newDescription', state.description);
    const cardsName = state.cards.data.map(data => data[0]);
    const cardsDesc = state.cards.data.map(data => data[data.length - 1]);
    localStorage.setItem('cardsName', cardsName);
    localStorage.setItem('cardsDesc', cardsDesc);

    window.location.href = 'http://localhost:3000/create'
  
  }
    case studyActions.LOAD_STUDY: {
      
      const newState = Object.assign({}, state);
      const study = action.payload.study;
      if (action.payload.status === StatusEnum.SUCCESS) {
        newState.id = study.id;
        newState.title = study.title;
        newState.description = study.description;
        newState.isLive = study.isLive;
        newState.launchedDate = new Date(study.launchedDate);
        newState.ended = study.ended ? new Date(study.ended): undefined;
        newState.noParticipants = study.participants === 0 ? true : false;
        newState.shareUrl = study.shareUrl;
        newState.participants = {
          completion: study.participants ? study.participants.completion: '0%',
          total: study.participants ? study.participants.total: 0,
          completed: study.participants ? study.participants.completed: 0,
          data: study.participants ? study.participants.data: [],
        };
        
        newState.sorting = {
          data: study.sorting && study.sorting.data ? study.sorting.data : [],
        };
        newState.cards = {
          average: study.cards ? study.cards.average: '0%',
          total: study.cards ? study.cards.total: 0,
          sorted: study.cards ? study.cards.sorted: 0,
          data: study.cards ? study.cards.data: [],
        };
        newState.categories = {
          similarity: study.categories ? study.categories.similarity: '0%',
          total: study.categories ? study.categories.total: 0,
          similar: study.categories ? study.categories.similar: 0,
          merged: study.categories ? study.categories.merged: 0,
          data: study.categories ? study.categories.data: [],
        };
        newState.similarityMatrix = study.similarityMatrix;
      }

      newState.isFetching = action.payload.status !== StatusEnum.SUCCESS;
      return newState;
    }
    case studyActions.LOAD_CLUSTERS: {
      let clusters = {};
      if (action.payload.status === StatusEnum.SUCCESS) {
        clusters = action.payload.clusters;
      }
      return Object.assign({}, state, {
        'clusters': clusters,
        'clustersFetching': action.payload.status !== StatusEnum.SUCCESS,
      });
    }
    case studyActions.CHANGE_VIEW: {
      return Object.assign({}, state, {
        'selectedItem': action.payload.no,
      });
    }
    case studyActions.CHANGE_HOVERED_CARDS: {
      const selectedCards = [];
      for (let i = 0; i < state.similarityMatrix.length; i++) {
        selectedCards.push(
            i === action.payload.index1 ||
            i === action.payload.index2
        );
      }
      return Object.assign({}, state, {
        'selectedCards': selectedCards,
      });
    }
    case studyActions.TOGGLE_POPUP: {
      return Object.assign({}, state, {
        'popupShowing': action.payload.toggle,
      });
    }
    case studyActions.TOGGLE_EDIT_POPUP: {
      return Object.assign({}, state, {
      'editPopupOpen': action.payload.toggle,
  });
}
  
  case studyActions.DOWNLOAD_XLSX: {
    const wb = XLSX.utils.book_new();
    const participants = [...state.participants.data]
    // Create Paricipants Sheet 
     participants.unshift(["Participant no", 'Time taken',	'Cards sorted',	'Categories created']);
    const ws1 = XLSX.utils.aoa_to_sheet(participants);
    XLSX.utils.book_append_sheet(wb, ws1, 'Participants');

    const customHeaders = ["no", "category", "cards", "comment"];
    const sortedData = state.sorting.data.map(item => customHeaders.map(header => item[header]));
    customHeaders[0] = "Participant no";
    sortedData.unshift(customHeaders);
    const flattenedSorting = sortedData.map(row => row.map(cell => Array.isArray(cell) ? cell.join(", ") : cell));

    const ws2 = XLSX.utils.aoa_to_sheet(flattenedSorting);
    //const ws2 = XLSX.utils.json_to_sheet(state.sorting.data);
    XLSX.utils.book_append_sheet(wb, ws2, 'Sorting');

    const cards = [...state.cards.data];
    cards.unshift(["Card",	'Categories No',	'	Categories',	'Frequency','Description']);
    const flattenedCards = cards.map(row => row.map(cell => Array.isArray(cell) ? cell.join(", ") : cell));

    const ws3 = XLSX.utils.aoa_to_sheet(flattenedCards);
    XLSX.utils.book_append_sheet(wb, ws3, 'Cards');

    const categories = [...state.categories.data];
    categories.unshift(["Category",	'Cards no',	'Cards',	'Frequency','Participants']);
    const flattenedCategories = categories.map(row => row.map(cell => Array.isArray(cell) ? cell.join(", ") : cell));
    const ws4 = XLSX.utils.aoa_to_sheet(flattenedCategories);
    XLSX.utils.book_append_sheet(wb, ws4, 'Categories');
    XLSX.writeFile(wb, 'data.xlsx',{compression:true});

  }


    default: {
      return state;
    }
  };
}
