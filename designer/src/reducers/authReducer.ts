import * as authAction from "../actions/authAction";

export default function authReducer(state: any = {}, action: any) {
    switch (action.type) {
        case authAction.SET_AUTH_TOKEN: {
            return Object.assign({}, state, {token: action.payload.token});
        }
        default: {
          return state;
        }
    }
}