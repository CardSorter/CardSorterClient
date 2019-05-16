const initialState = {
  cards: {
    notFound: undefined,
    status: undefined,
  },
  container: [],
  categories: {
    /* CategoryId: Category */
  },
  ui: {
    showOnBoarding: undefined,
    changeTitle: undefined,
    showingDescription: undefined,
    studyID: undefined,
    sendingSort: undefined,
    renderThanks: undefined,
    thanksMessage: undefined,
    cardsSorted: undefined,
    categoriesCreated: undefined,
    timeStarted: undefined,
    timeEnded: undefined,
    popup: {
      show: false,
      title: 'Add a comment',
      content: undefined,
    },
  },
};

export default initialState;
