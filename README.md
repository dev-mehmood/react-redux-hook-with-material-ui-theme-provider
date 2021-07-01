# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Add Material-ui

$ yarn add @material-ui/core @material-ui/icon

## For custom typings

In tsconfig.json add

```json
{
  "compilerOptions": {
    "typeRoots": ["node_modules/@types", "./src/react-app-env.d.ts"]
  },
  "include": ["src"]
};
```

### Redux:

## 1- Create initial starting data statuses

```typescript
const appState: IState = {
  currentTheme: "mood",
  sayHello: "Hello World",
};
```

## 2- Create context with data

```typescript
export const Store = createContext<IStoreCtx>({
  state: appState,
  dispatch: (a: IAction) => void 0,
});
```

## 3- Create provider React component

    Use RootReducer from step number (8)
    pay attention as how to use "useReducer hook"

```typescript
export const StoreProvider = (props: any) => {

  const [state, dispatch] = useReducer(RootReducer, appState);  <----RootReducer from step (8)
  return useMemo(
    () => (
      <Store.Provider value={{ state, dispatch }}>
        {props.children}
      </Store.Provider>
    ),
    [state]
  );
};
```

## 4- Warp you app component in storeprovider in index.js

```typescript
ReactDOM.render(
  // <React.StrictMode>
  <StoreProvider>
    <ThemeChanger>
      <App />
    </ThemeChanger>
  </StoreProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);
```

## 5- Wirte Reducers to change the state

```typescript
const ThemeReducer = (
  state: IState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case "CHANGE_THEME":
      // optimization
      if (state.currentTheme === payload) return state;
      return { ...state, currentTheme: payload };
    default:
      return state;
  }
};
```

## 6- You can write thunk function for asynchronous api call

```typescript
const changeThemeThunk: ThunkFn = (payload: any | undefined) => {
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
```

## 8- Make a Root reducer

```typescript
export const ComposeRootReducer = function <T extends Reducer<any, any>[]>(
  ...fns: T
) {
  return (s: IState, a: IAction): IState => {
    return fns.reduce((acc: IState, el: Reducer<IState, IAction>) => {
      return (acc = el(acc, a));
    }, s);
  };
};
```

```typescript
const RootReducer = ComposeRootReducer(ThemeReducer); <--------
Pass it to useReducer in step(3)
```

## 7- To change data and pass data to store you can use thunkfn or reducer by using

    useDispatch hook

```typescript
function Header() {
  ...
  const dispatch = useDispatch();  <-----------

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        ...
          <Button
            variant="contained"
            color="secondary"
            onClick={(event) => {
              event.preventDefault();
              dispatch(changeThemeThunk(undefined));  <------ using thunk for async calls
            }}
          >
            Change Theme
          </Button>
        ...

        <Button
            variant="contained"
            color="secondary"
            onClick={(event) => {
              event.preventDefault();
              dispatch({type: "CHANGE_TITLE", payload: "Hi React developsers"});  <------ dispatch actions directly
            }}
          >
            Change Theme
          </Button>
      </AppBar>
    </div>
  );
}
```

## 8- Getting data inside a component ; this useSelector hook will only call when

Returned state is changed from previous

```typescript
fuction App() {
  // using state from store
  const sayHello = useSelector((state) => state.sayHello);
    ....
  return (
    <div className={classes.root}>
     ....
          <Typography variant="h4" color="secondary">
            {sayHello}
          </Typography>
    ....

    </div>
  );
}
```
