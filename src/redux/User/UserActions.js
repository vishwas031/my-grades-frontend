import { SET_USER } from "./UserTypes";

export function setUser(user){
    return {
        type: SET_USER,
        payload: user
    };
}