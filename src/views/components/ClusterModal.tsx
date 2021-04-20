import {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AppContext from "../../context/App-context";
import ClusterItem from "./ClusterItem";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoginModal from "./Login";
import SearchBar from "./SearchBar";
import ColorSwitch from "./ColorSwitch";
import PaletteIcon from "@material-ui/icons/Palette";
import IconButton from "@material-ui/core/IconButton";
import { green, grey, blue } from "@material-ui/core/colors";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginLeft: theme.spacing(40),
      paddingTop: theme.spacing(15),
    },
  })
);

interface ClusterProps {
  isMobile?: boolean;
  isLoged?: boolean;
}

const ClusterModal: FunctionComponent<ClusterProps> = ({
  isMobile,
  isLoged,
}) => {
  const classes = useStyles();
  type Context = {
    cluster?: {
      clusters: {
        name: string;
        id: string;
        address: string;
        images: Array<any | object>;
        stars: number;
        amenities: { name: string; id: string }[];
      }[];
    };
    getCluster?: any;
    isLoading?: boolean;
  };
  const appContext = useContext(AppContext);
  const { cluster, getCluster, isLoading }: Context = appContext;
  const [color, setColor] = useState<string>("");
  const [btnColor, setBtnColor] = useState<string>("");
  const [colorSwitch, setColorSwitch] = useState<boolean>(false);
  const [searchSwitch, setSearchSwitch] = useState<boolean>(false);
  const inputRef: React.MutableRefObject<any> = useRef();
  const btnRef: React.MutableRefObject<any> = useRef();

  function handleClick(): void {
    if (inputRef.current) {
      setColor(inputRef.current.value);
    }
  }
  function handleBtnClick(): void {
    if (btnRef.current) {
      setBtnColor(btnRef.current.value);
    }
  }
  function handleSwitch() {
    setColorSwitch(!colorSwitch);
  }

  function handleSearchSwitch() {
    setSearchSwitch(!searchSwitch);
  }

  useEffect(() => {
    getCluster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoged]);

  const h1: object = { width: "100", textAlign: "center", fontSize: "40px" };

  const palleteStyle: object = {
    position: "fixed",
    top: "60px",
    right: "0",
    zIndex: "1000",
  };

  const searchSwitchStyle: object = {
    position: "fixed",
    top: "60px",
    left: "0",
    zIndex: "1000",
  };

  const iconFont: object = { fontSize: !isMobile ? "60px" : "40px" };
  return (
    <>
      {!isLoged ? (
        <div>
          <LoginModal title="Login" />
        </div>
      ) : isLoading ? (
        <div className={classes.root}>
          <CircularProgress size={400} />
        </div>
      ) : (
        <>
          {colorSwitch ? (
            <div>
              <div style={palleteStyle} onClick={handleSwitch}>
                <IconButton
                  style={{ color: grey[500] }}
                  aria-label="Cambia la paleta de colores"
                >
                  <ExitToAppIcon style={iconFont} />
                </IconButton>
              </div>
              <h1>
                <ColorSwitch
                  title="Eligue el color de la tarjeta del Hotel"
                  ref={inputRef}
                  position={{ top: "130px", right: "10px" }}
                >
                  <input type="button" value="cambia" onClick={handleClick} />
                </ColorSwitch>
                <ColorSwitch
                  title="Eligue el color del Boton"
                  ref={btnRef}
                  position={{ top: "250px", right: "10px" }}
                >
                  <input
                    type="button"
                    value="cambia"
                    onClick={handleBtnClick}
                  />
                </ColorSwitch>
              </h1>
            </div>
          ) : (
            <div style={palleteStyle} onClick={handleSwitch}>
              <Tooltip title="Cambia la paleta de colores">
                <IconButton
                  style={{ color: green[500] }}
                  aria-label="Cambia la paleta de colores"
                >
                  <PaletteIcon style={iconFont} />
                </IconButton>
              </Tooltip>
            </div>
          )}
          <h1 style={h1}>Hoteles</h1>
          {!isMobile ? (
            <SearchBar
              position={{ top: "100px", left: "10px" }}
              title="Busca el Hotel que mas quieras!"
              isMobile={isMobile}
            />
          ) : searchSwitch ? (
            <>
              <div style={searchSwitchStyle} onClick={handleSearchSwitch}>
                <IconButton
                  style={{ color: grey[500] }}
                  aria-label="Cambia la paleta de colores"
                >
                  <ArrowBackIcon style={iconFont} />
                </IconButton>
              </div>
              <SearchBar
                position={{ top: "130px", left: "10px" }}
                title="Busca el Hotel que mas quieras!"
                isMobile={isMobile}
              />
            </>
          ) : (
            <div style={searchSwitchStyle} onClick={handleSearchSwitch}>
              <IconButton
                style={{ color: blue[300] }}
                aria-label="Cambia la paleta de colores"
              >
                <FindInPageIcon style={iconFont} />
              </IconButton>
            </div>
          )}
          {cluster &&
            cluster.clusters.map((hotel) => (
              <ClusterItem
                key={hotel.id}
                name={hotel.name}
                address={hotel.address}
                images={hotel.images}
                stars={hotel.stars}
                amenities={hotel.amenities}
                backGroundColor={color && color}
                btnColor={btnColor}
              />
            ))}
        </>
      )}
    </>
  );
};

export default ClusterModal;
