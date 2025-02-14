export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";

export function setAuthToken(token: string | undefined) {
    return {
        type: SET_AUTH_TOKEN,
        payload: {
            token,
        },
        error: false,
    }
}