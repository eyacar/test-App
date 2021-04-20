import { useReducer } from "react";
import AppContext from "./App-context";
import AppReducer from "./App-reducer";
import {
  GET_CLUSTER,
  SEARCH_HOTEL,
  SET_LOADING,
  SET_LOGIN,
  SET_LOGOUT,
} from "./App-types";
import MobileDetect from "../views/util/MobileDetect";
import Cluster from "./ClusterExample.json";

type Props = {
  children: JSX.Element;
};

const AppState = ({ children }: Props) => {
  type State = {
    cluster: null | Array<object> | object;
    isLoading: boolean;
    user: null | string;
    isLoaged: null | string;
    isMobile: boolean;
  };
  const url: string = `https://basset.free.beeceptor.com/reactjs-test/accommodations`;
  const mobileDetect: boolean = MobileDetect(); // Set state true or false depends of the device you use, Mobile is true.
  const initialState: State = {
    cluster: null,
    isLoading: false,
    isLoaged: localStorage.getItem("log"),
    user: localStorage.getItem("user"),
    isMobile: mobileDetect,
  };
  const [state, dispatch]: Array<object | any> = useReducer(
    AppReducer,
    initialState
  );

  // Get all the cluster
  const getCluster: () => void = async () => {
    setLoading();
    let data: undefined | object;
    try {
      const response = await fetch(url);
      data = await response.json();
    } catch (err) {
      console.warn(`Fetch error: ${err}`);
      data = Cluster; // Bypass for de test reviewers, if there is to many request and you can't load de data.
    }
    return dispatch({
      type: GET_CLUSTER,
      payload: data,
    });
  };

  // Search the cluster
  const searchCluster: (params: string) => void = (params) => {
    setLoading();
    let data = { ...state.cluster, clusters: params };
    dispatch({
      type: SEARCH_HOTEL,
      payload: data,
    });
  };

  // Clear Search and set the initial state(initial Fetch)
  const clearSearch: () => void = () => getCluster();

  // Set Loading true
  const setLoading: () => void = () => dispatch({ type: SET_LOADING });

  // Set Login true
  const setLogin: (user: string) => void = (user) => {
    localStorage.setItem("user", user);
    localStorage.setItem("log", "true");
    dispatch({ type: SET_LOGIN });
  };

  // Set Login false
  const setLogout: () => void = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("log");
    dispatch({ type: SET_LOGOUT });
  };

  return (
    <AppContext.Provider
      value={{
        cluster: state.cluster,
        clusterSearch: state.clusterSearch,
        isLoading: state.isLoading,
        isMobile: state.isMobile,
        isLoaged: state.isLoaged,
        user: state.user,
        getCluster,
        searchCluster,
        clearSearch,
        setLogin,
        setLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
