import { useEffect, useState } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import teal from "@material-ui/core/colors/teal";
import { IState } from "../Redux/Models";
import { useSelector } from "../Redux/StoreProvider";

const mood = createMuiTheme({
  // pay attention as how we added extras prop in Theme object in Typescript ( see src/react-app.env.d.ts)
  extras: {
    footerBgColor: "#7bb7d3",
  },
  palette: {
    primary: pink,
    secondary: orange,
  },
});

const passion = createMuiTheme({
  palette: {
    primary: teal,
    secondary: blue,
  },
});

const ThemeChanger = (props: any) => {
  const currentTheme = useSelector((state) => {
    return state.currentTheme;
  });
  const [activeTheme, setActiveTheme] = useState<any>(mood);

  useEffect(() => {
    switch (currentTheme) {
      case "mood":
        setActiveTheme(responsiveFontSizes(mood));
        console.log("mood theme selected");
        break;
      case "passion":
        setActiveTheme(responsiveFontSizes(passion));
        break;

      default:
        setActiveTheme(responsiveFontSizes(mood));
        console.log("mood theme selected");
        break;
    }
  }, [currentTheme]);
  return <ThemeProvider theme={activeTheme}>{props.children}</ThemeProvider>;
};

export { ThemeChanger };
