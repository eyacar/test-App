import {
  GET_CLUSTER,
  SEARCH_HOTEL,
  SET_LOADING,
  SET_LOGIN,
  SET_LOGOUT,
} from "./App-types";

interface Action {
  type: string;
  payload?: any;
}
type State = object;

export default function Appreducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CLUSTER:
      return {
        ...state,
        cluster: payload,
        isLoading: false,
      };
    case SEARCH_HOTEL:
      return {
        ...state,
        cluster: payload,
        isLoading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_LOGIN:
      return {
        ...state,
        isLoaged: localStorage.getItem("log"),
        user: localStorage.getItem("user"),
      };
    case SET_LOGOUT:
      return {
        ...state,
        isLoaged: localStorage.getItem("log"),
        user: localStorage.getItem("user"),
      };
    default:
      return state;
  }
}
