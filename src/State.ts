export interface CardSchema {
 [key: number]: {
   id: number,
   name: string,
   description: string,
 }
}

export interface CardSorterState {
  header: {
    username: string,
  },
  studies: {
    isFetching: boolean,
    didInvalidate: boolean,
    studies: any[],
  },
  studyCreation: {
    title: string,
    description: string,
    url_to_study: string,
    share_url: string,
    errorTitle: boolean,
    errorDescription: boolean,
    errorCards: boolean,
    errorMessage: boolean,
    cards: CardSchema,
    thanksMessage: string,
    ui: {
      currentPage: number,
      titleFetching: boolean,
      validTitle: boolean,
      studySending: boolean,
    },
  },
  study: {
    isFetching: boolean,
    id: number,
    title: string,
    isLive: boolean,
    launchedDate: string,
    ended: string,
    selectedItem: number,
    noParticipants: boolean,
    shareUrl: string,
    popupShowing: boolean,
    participants: {
      completion: string,
      total: number,
      completed: number,
      data: [],
    },
    cards: {
      average: string,
      total: number,
      sorted: string,
      data: [],
    },
    categories: {
      similarity: string,
      total: number,
      similar: number,
      merged: number,
      data: [],
    },
    similarityMatrix: any,
    selectedCards: any[],
    clusters: any,
    clustersFetching: boolean,
  },
}