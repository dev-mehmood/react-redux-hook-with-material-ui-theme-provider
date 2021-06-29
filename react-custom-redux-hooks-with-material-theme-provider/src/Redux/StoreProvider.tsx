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
} from "react";

import { isEqual } from "../Utils/Utils";
import { IAction, ISelector, IState, ThunkCb } from "./Models";

import { ThemeReducer } from "./Reducers";

const AppState: IState = {
  currentTheme: "mood",
  sayHello: "Hello World",
};

export const RootReducer = function <T extends Reducer<any, any>[]>(...fns: T) {
  const args = Array.prototype.slice.call(arguments);
  return (s: IState, a: IAction): IState => {
    return fns.reduce((acc: IState, el: Reducer<IState, IAction>) => {
      return (acc = el(acc, a));
    }, s);
  };
};
export const Store = createContext([AppState]);

export const StoreProvider = (props: any) => {
  const [state, dispatch] = useReducer(RootReducer(ThemeReducer), AppState);

  return (
    <Store.Provider value={[state, dispatch] as any}>
      {props.children}
    </Store.Provider>
  );
};

export const useDispatch = () => {
  // experemental implementation
  const [state, dispatch] = useContext<any>(Store);
  const thunk = useCallback(
    (arg: IAction | ThunkCb): void => {
      if (typeof arg === "function") {
        arg.apply(null, [dispatch as Dispatch<IAction>, () => state]);
      } else {
        dispatch(arg);
      }
    },
    [state]
  );
  return thunk;
};

export const useSelector = (selector: ISelector): any => {
  // experemental implementation

  const ref = useRef(1);
  const [state, dispatch] = useContext<any>(Store);

  const newState = selector(state);
  const [passState, setPassState] = useState(newState);

  if (!isEqual(passState, newState)) {
    ref.current++;
  }
  useEffect(() => {
    setPassState(newState);
  }, [ref.current]);

  return passState;
};
