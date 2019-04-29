const initialState = {
  header: {
    username: undefined,
    profilePic: '../icons/sample-user.svg',
  },
  studies: {
    isFetching: undefined,
    didInvalidate: undefined,
    studies: [],
  },
  studyCreation: {
    title: 'Title',
    description: 'Description',
    url_to_study: undefined,
    share_url: undefined,
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
    id: undefined,
    title: undefined,
    isLive: undefined,
    launchedDate: undefined,
    ended: undefined,
    selectedItem: 0,
    noParticipants: true,
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
    similarityMatrix: undefined,
    selectedCards: [],
  },
};

export default initialState;
