export const IS_FETCHING = 'IS_FETCHING';
export const DID_INVALIDATE = 'DID_INVALIDATE';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const ERROR = 'ERROR';
export const IS_UPDATING = 'IS_UPDATING';

export type ActionStatus = typeof IS_FETCHING | typeof DID_INVALIDATE | typeof SUCCESS | typeof FAILURE | typeof ERROR
  | typeof IS_UPDATING;