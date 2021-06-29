import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { ThemeChanger } from "./Theme/ThemeProvider";
import { StoreProvider, useSelector } from "./Redux/StoreProvider";
import Header from "./components/Header";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { IState } from "./Redux/Models";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: theme.palette.primary.dark,
      minHeight: "100vh",
    },
  })
);

function App() {
  // using state from store
  const sayHello = useSelector((state) => state.sayHello);

  return (
    <StoreProvider>
      <ThemeChanger>
        <Box>
          <Header />

          <Box
            minHeight="calc( 100vh - 64px )"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h4" color="secondary">
              {sayHello}
            </Typography>
          </Box>
        </Box>
      </ThemeChanger>
    </StoreProvider>
  );
}

export default App;
