import { useContext, useState } from "react";
import AppContext from "../../context/App-context";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

export default function SearchBar({
  title,
  position,
  isMobile,
}: {
  title?: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  isMobile?: boolean;
}) {
  const { top, left, right, bottom } = position;
  type Context = {
    searchCluster?: any;
    cluster?: {
      clusters: {
        name: string;
      }[];
    };
    getCluster?: any;
  };
  const appContext = useContext(AppContext);
  const { searchCluster, cluster, getCluster }: Context = appContext;
  const [search, setSearch] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(false);

  function handleChange(event: any) {
    setSearch(event.target.value);
  }

  function handleSearch() {
    let params: Array<any> = [];
    let i = search.length;
    if (i > 0 && cluster) {
      cluster.clusters
        .filter(
          (hotel: any) =>
            hotel.name.slice(0, i).toLowerCase() === search.toLocaleLowerCase()
        )
        .map((hotel: any) => params.push(hotel));
      searchCluster(params);
      setDisable(true);
    }
  }

  function handleClear() {
    getCluster();
  }

  const ColorSwitchStyle: object = {
    position: "fixed",
    top: top && top,
    left: left && left,
    bottom: bottom && bottom,
    right: right && right,
    zIndex: "1000",
    backgroundColor: isMobile ? " rgba(0, 0, 0, .8)" : "white",
    color: isMobile ? "white" : "black",
  };

  return (
    <div style={ColorSwitchStyle}>
      <h1 style={{ width: "200px", fontSize: "12px" }}>{title}</h1>
      <input
        type="search"
        placeholder="Search..."
        onChange={handleChange}
        disabled={disable}
        style={{ marginRight: "20px" }}
      />
      {!disable ? (
        <SearchIcon onClick={handleSearch} />
      ) : (
        <i onClick={handleClear}>
          <ClearIcon />
          Clear
        </i>
      )}
    </div>
  );
}
