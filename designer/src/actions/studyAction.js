export const LOAD_STUDIES = 'LOAD_STUDIES';
export const FETCH_STUDIES = 'FETCH_STUDIES';

/**
 *
 * @param {Boolean} isFetching
 * @param {Boolean} didInvalidate
 * @param {Error} error
 * @return {JSON} the action
 */
export function fetchStudies(isFetching, didInvalidate, error) {
  return {
    type: FETCH_STUDIES,
    payload: {
      isFetching: isFetching,
      didInvalidate: didInvalidate,
    },
    error: error || false,
  };
}


/**
 *
 * @param {StudyCard[]} studies
 * @return {JSON} the action
 */
export function loadStudies(studies) {
  return {
    type: LOAD_STUDIES,
    payload: {
      studies: studies,
    },
    error: false,
  };
}
