import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Header from "./components/Header";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "./Redux/StoreProvider";

const useAppStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: theme.palette.primary.light,
      minHeight: "100vh",
    },
  })
);

function App() {
  // using state from store
  const classes = useAppStyles();
  const sayHello = useSelector((state) => state.sayHello);

  return (
    <div className={classes.root}>
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
    </div>
  );
}

export default App;
