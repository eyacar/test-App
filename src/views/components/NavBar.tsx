import { useContext } from "react";
import AppContext from "../../context/App-context";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function NavBar() {
  type Context = {
    user?: null | string;
    setLogout?: any;
    isMobile?: boolean;
  };
  const appContext = useContext(AppContext);
  const { user, setLogout, isMobile }: Context = appContext;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        fontSize: isMobile ? "16px" : "",
      },
    })
  );

  const classes = useStyles();

  function handleClick() {
    setLogout();
  }

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          {user ? (
            <>
              <Typography variant="h6" className={classes.title}>
                Welcome {user}!
              </Typography>
              <Button onClick={handleClick} color="inherit">
                LogOut
              </Button>
            </>
          ) : (
            <Typography variant="h6" className={classes.title}>
              Debe logearse primero!
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
