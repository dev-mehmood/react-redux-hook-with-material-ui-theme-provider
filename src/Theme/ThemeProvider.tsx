import { useMemo } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import teal from "@material-ui/core/colors/teal";
import { useSelector } from "../Redux/StoreProvider";

const mood = responsiveFontSizes(
  createMuiTheme({
    // pay attention as how we added extras prop in Theme object in Typescript ( see src/react-app.env.d.ts)
    extras: {
      name: "mood",
      footerBgColor: "#7bb7d3",
    },
    palette: {
      primary: pink,
      secondary: orange,
    },
  })
);

const passion = responsiveFontSizes(
  createMuiTheme({
    extras: {
      name: "passion",
    },
    palette: {
      primary: teal,
      secondary: blue,
    },
  })
);

const ThemeChanger = (props: any) => {
  const currentTheme = useSelector((state) => {
    return state.currentTheme;
  });

  return useMemo(() => {
    let activeTheme = mood;
    switch (currentTheme) {
      case "mood":
        activeTheme = mood;
        console.log("mood theme selected");
        break;
      case "passion":
        activeTheme = passion;
        break;

      default:
        activeTheme = mood;
        console.log("mood theme selected");
        break;
    }
    return <ThemeProvider theme={activeTheme}>{props.children}</ThemeProvider>;
  }, [currentTheme]);
};

export { ThemeChanger };
