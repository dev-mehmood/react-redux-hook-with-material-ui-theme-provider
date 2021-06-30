/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useState,
  useEffect,
  createContext,
  useReducer,
  useContext,
  useRef,
  useCallback,
  Dispatch,
  ProviderProps,
  Reducer,
  useMemo,
} from "react";

import { isEqual } from "../Utils/Utils";
import { IAction, ISelector, IState, IStoreCtx, ThunkCb } from "./Models";

import { ThemeReducer } from "./Reducers";

const appState: IState = {
  currentTheme: "mood",
  sayHello: "Hello World",
};

export const ComposeRootReducer = function <T extends Reducer<any, any>[]>(
  ...fns: T
) {
  const args = Array.prototype.slice.call(arguments);
  return (s: IState, a: IAction): IState => {
    return fns.reduce((acc: IState, el: Reducer<IState, IAction>) => {
      return (acc = el(acc, a));
    }, s);
  };
};

export const Store = createContext<IStoreCtx>({
  state: appState,
  dispatch: (a: IAction) => void 0,
});

const RootReducer = ComposeRootReducer(ThemeReducer);

export const StoreProvider = (props: any) => {
  const [state, dispatch] = useReducer(RootReducer, appState);
  return useMemo(
    () => (
      <Store.Provider value={{ state, dispatch }}>
        {props.children}
      </Store.Provider>
    ),
    [state]
  );
};

export const useDispatch = () => {
  // experemental implementation
  const { state, dispatch } = useContext<IStoreCtx>(Store);
  const thunk = (arg: IAction | ThunkCb): void => {
    if (typeof arg === "function") {
      arg.apply(null, [dispatch as Dispatch<IAction>, () => state]);
    } else {
      dispatch(arg);
    }
  };
  return thunk;
};

export const useSelector = (selector: ISelector): Partial<IState> => {
  // experemental implementation
  const { state } = useContext<IStoreCtx>(Store);
  const newState = selector(state);
  const [passState, setPassState] = useSmartState(newState);
  setPassState(newState);
  return useMemo(() => passState, [passState]);
};

export const useSmartState = <T,>(defState: T): [T, (newState: T) => void] => {
  const [state, setState] = useState(defState);
  function smartSetState(newState: typeof defState) {
    if (!isEqual(state, newState)) {
      setState(newState);
    }
  }
  return [state, smartSetState];
};
