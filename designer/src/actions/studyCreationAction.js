export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const CHANGE_URL = 'CHANGE_URL';

/**
 * Changes the title of the study that is going to be created.
 * @param {String} title
 * @return {JSON} the action
 */
export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    payload: {
      title: title,
    },
    error: false,
  };
}

/**
 * Changes the title of the study that is going to be created.
 * @param {String} description
 * @return {JSON} the action
 */
export function changeDescription(description) {
  return {
    type: CHANGE_DESCRIPTION,
    payload: {
      description: description,
    },
    error: false,
  };
}

/**
 * Changes the url of the study that is going to be created.
 * @param {String} url
 * @return {JSON} the action
 */
export function changeURL(url) {
  return {
    type: CHANGE_URL,
    payload: {
      url: url,
    },
    error: false,
  };
}
