const initialState = {
  cards: {
    notFound: undefined,
    status: undefined,
    showingDescription: [],
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
    renderLink: false,
    thanksMessage: undefined,
    link: undefined,
    cardsSorted: undefined,
    categoriesCreated: undefined,
    timeStarted: undefined,
    timeEnded: undefined,
    showToast: false,
    popup: {
      show: false,
      title: 'Add a comment',
      content: undefined,
    },
    errors:{
      title: false,
      sameCategory: false,
    },
    confirmPopup: {
      show: undefined,
      unSorted: true,
    },
  },
};

export default initialState;
