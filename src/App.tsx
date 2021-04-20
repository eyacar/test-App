import { useContext } from "react";
import AppContext from "./context/App-context";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import Toolbar from "@material-ui/core/Toolbar";
import ClusterModal from "./views/components/ClusterModal";
import NavBar from "./views/components/NavBar";

interface Props {
  window?: () => Window;
  children?: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

function ScrollTop(props: Props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const App = (props: Props) => {
  type Context = {
    isMobile?: boolean;
    isLoaged?: boolean;
  };
  const appContext = useContext(AppContext);
  const { isMobile, isLoaged }: Context = appContext;

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box my={2}>
          <ClusterModal isMobile={isMobile} isLoged={isLoaged} />
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default App;
