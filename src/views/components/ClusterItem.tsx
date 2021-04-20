import { FunctionComponent } from "react";
import { useContext } from "react";
import AppContext from "../../context/App-context";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Carousel from "./Carousel";
import Button from "@material-ui/core/Button";
import StarModal from "./StarModal";
import { blue } from "@material-ui/core/colors";
import PoolIcon from "@material-ui/icons/Pool";
import WifiIcon from "@material-ui/icons/Wifi";
import LocalParkingIcon from "@material-ui/icons/LocalParking";

interface ClusterProps {
  name: string;
  address: string;
  images: { url: string; name: string }[];
  stars: number;
  amenities: { name: string; id: string }[];
  backGroundColor: string;
  btnColor: string;
}

const ClusterItem: FunctionComponent<ClusterProps> = ({
  name,
  address,
  images,
  stars,
  amenities,
  backGroundColor,
  btnColor,
}) => {
  const appContext = useContext(AppContext);
  type Context = {
    isMobile?: boolean;
  };
  const { isMobile }: Context = appContext;

  const useStyles = makeStyles({
    root: {
      display: !isMobile ? "flex" : "block",
      minWidth: 275,
      maxWidth: !isMobile ? 4000 : 500,
      margin: "20px auto",
      backgroundColor: backGroundColor ? backGroundColor : "#FFFFFF",
    },
    content: {
      display: !isMobile ? "flex" : "block",
      padding: "0",
      borderBottom: isMobile ? "1px solid #cbcaca" : "none",
      borderRight: !isMobile ? "1px solid #cbcaca" : "none",
      width: !isMobile ? "900px" : "328px",
      height: !isMobile ? "213px" : "auto",
    },
    title: {
      fontSize: 20,
      padding: "0",
      margin: "0",
    },
    secondaryTitle: {
      fontSize: 13,
      padding: "0",
      margin: "0",
    },
    btn: {
      backgroundColor: btnColor ? btnColor : "#126AFF",
      width: "100%",
      "&:hover": {
        backgroundColor: btnColor ? btnColor : "#126AFF",
        width: "100%",
      },
    },
    contentAbove: {
      padding: "0",
      margin: "5px auto",
      fontSize: "18px",
    },
    subtitle: {
      padding: "0",
      margin: "5px auto",
      fontSize: "12px",
    },
  });
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Carousel images={images} />
        <div style={{ margin: "10px 0 0 20px" }}>
          <h1 className={classes.title}>{name}</h1>
          <h1 className={classes.secondaryTitle}>{address}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
            }}
          >
            <StarModal stars={stars} />
            <div style={{ color: blue[500], marginLeft: "10px" }}>
              {amenities
                .filter((amenities) =>
                  amenities.name
                    .toLowerCase()
                    .includes("aparcacoches" || "aparcamiento")
                )
                .map(
                  (amenities, i) =>
                    i < 1 && (
                      <LocalParkingIcon
                        style={{ fontSize: "1rem", margin: "5px 2px" }}
                      />
                    )
                )}
              {amenities
                .filter((amenities) =>
                  amenities.name.toLowerCase().includes("wifi")
                )
                .map(
                  (amenities, i) =>
                    i < 1 && (
                      <WifiIcon
                        style={{ fontSize: "1rem", margin: "5px 2px" }}
                      />
                    )
                )}
              {amenities
                .filter((amenities) =>
                  amenities.name.toLowerCase().includes("piscina")
                )
                .map(
                  (amenities, i) =>
                    i < 1 && (
                      <PoolIcon
                        style={{ fontSize: "1rem", margin: "5px 2px" }}
                      />
                    )
                )}
            </div>
          </div>
          <div style={{ width: "100%" }}>
            {amenities
              .filter((amenities) =>
                amenities.name.toLowerCase().includes("desayuno gratis")
              )
              .map(
                (amenities, i) =>
                  i < 1 && (
                    <h1
                      style={{
                        fontSize: "15px",
                        textAlign: "center",
                        color: "green",
                        margin: isMobile ? "10px 0" : "80px 0",
                        width: "150px",
                        backgroundColor: "rgba(0,255,0, .2)",
                      }}
                    >
                      Desayuno incluido
                    </h1>
                  )
              )}
          </div>
        </div>
      </CardContent>
      <div
        style={{
          width: "250px",
          margin: "10px 0 10px 20px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div>
          <h1 className={classes.contentAbove}>Total Final</h1>
          <h4 className={classes.subtitle}>6 noches, 2 personas</h4>
          <h1 className={classes.contentAbove}> Ars 2.300</h1>
          <h4 className={classes.subtitle}>impuestos y tasas incluidas</h4>
        </div>
        <Button variant="contained" className={classes.btn}>
          Primary
        </Button>
      </div>
    </Card>
  );
};

export default ClusterItem;
