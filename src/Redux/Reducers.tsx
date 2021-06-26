import { IState, ThunkFn } from "./Models";

const ThemeReducer = (
  state: IState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case "CHANGE_THEME":
      return { ...state, currentTheme: payload };
    default:
      return state;
  }
};

const changeThemeThunk: ThunkFn = (payload: any) => {
  return (dispatch, getState) => {
    // simulation of thunk operation
    var tim = setTimeout(() => {
      clearTimeout(tim);
      const theme = getState().currentTheme;
      dispatch({
        type: "CHANGE_THEME",
        payload: theme === "mood" ? "passion" : "mood",
      });
    }, 200);
  };
};

export { ThemeReducer, changeThemeThunk };
