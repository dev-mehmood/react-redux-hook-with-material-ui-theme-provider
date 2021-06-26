# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Add Material-ui

$ yarn add @material-ui/core @material-ui/icon

## For custom typings

In tsconfig.json add

```json
{
  "compilerOptions": {
    // ...
    "typeRoots": ["node_modules/@types", "./src/react-app-env.d.ts"]
  },
  "include": ["src"]
}
alert(s);
```
