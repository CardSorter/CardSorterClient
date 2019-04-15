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
      completion: '50%',
      total: 99,
      completed: 49,
      data: [
        ['#1', '00:05:43', '100%', '6'],
        ['#2', '00:05:43', '100%', '6'],
        ['#3', '00:05:43', '100%', '6'],
        ['#4', '00:05:43', '100%', '6'],
        ['#5', '00:05:43', '100%', '6'],
        ['#6', '00:05:43', '100%', '6'],
        ['#7', '00:05:43', '100%', '6'],
        ['#8', '00:05:43', '100%', '6'],
        ['#9', '00:05:43', '100%', '6'],
        ['#10', '00:05:43', '100%', '6'],
        ['#11', '00:05:43', '100%', '6'],
      ],
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
