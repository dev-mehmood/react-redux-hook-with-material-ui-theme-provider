import { Dispatch } from "react";
import { useDispatch } from "./StoreProvider";

export interface IState {
  sayHello: string;
  currentTheme: "passion" | "mood";
}

export type IGetState = () => IState;

export type ThunkCb = (
  dispatch: Dispatch<IAction>,
  getState: IGetState
) => void;

export type ThunkFn = (payload: any) => ThunkCb;

export interface User {
  displayName: string;
  email: string;
}

export interface IAction {
  type: string;
  payload: any;
}

export type IuseDispatch = typeof useDispatch;
export type ISelector = (state: IState) => any;
