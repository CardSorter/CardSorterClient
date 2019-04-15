export const CHANGE_VIEW = 'CHANGE_VIEW';

/**
 * Changes the view that the study page is showing.
 * @param {Number} viewNo
 * @return {JSON} the action.
 */
export function changeView(viewNo) {
  return {
    type: CHANGE_VIEW,
    payload: {
      no: viewNo,
    },
    error: false,
  };
}

