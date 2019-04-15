const initialState = {
  studies: {
    isFetching: undefined,
    didInvalidate: undefined,
    studies: [],
  },
  studyCreation: {
    title: 'Title',
    description: 'Description',
    urlPrefix: 'cardsorter.com/sort/user/',
    url: 'Title',
    cards: {
      1: {
        id: 1,
        name: undefined,
        description: undefined,
      },
    },
    thanksMessage: 'Thanks',
    ui: {
      currentPage: 1,
      titleFetching: undefined,
      validTitle: true,
      studySending: undefined,
    },
  },
  study: {
    isFetching: undefined,
    id: 1,
    title: 'Title',
    isLive: true,
    launched: new Date(2019, 3, 12),
    ended: undefined,
    selectedItem: 0,
    participants: {
      completion: undefined,
      total: undefined,
      completed: undefined,
      data: [],
    },
    cards: {
      average: undefined,
      total: undefined,
      sorted: undefined,
      data: [],
    },
    categories: {
      similarity: undefined,
      total: undefined,
      similar: undefined,
      merged: undefined,
      data: [],
    },
  },
};

export default initialState;
