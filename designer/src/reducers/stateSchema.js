const initialState = {
  studies: {
    isFetching: undefined,
    didInvalidate: undefined,
    studies: [],
  },
  studyCreation: {
    title: undefined,
    description: undefined,
    urlPrefix: 'cardsorter.com/sort/user/',
    url: undefined,
    cards: {
      1: {
        id: 1,
        name: undefined,
        description: undefined,
      },
    },
    thanksMessage: undefined,
  },
};

export default initialState;
