import { Input } from "@material-ui/core";
import { useState } from "react";
import { useContext } from "react";
import Button from "@material-ui/core/Button";
import AppContext from "../../context/App-context";

export default function LoginModal({ title }: { title: string }) {
  const [user, setUser] = useState<string>();
  type Context = {
    setLogin?: (() => void) | any;
  };
  const appContext = useContext(AppContext);
  const { setLogin }: Context = appContext;
  function handleChange(event: any) {
    setUser(event.target.value);
  }
  function handleClick() {
    if (user) {
      setLogin(user);
    }
  }
  const Style: any = {
    container: {
      width: "300px",
      margin: "100px auto",
      textAlign: "center",
    },
    input: {
      width: "230px",
    },
    btn: {
      margin: "50px auto",
      backgroundColor: "#126AFF",
      "&:hover": {
        backgroundColor: "#126AFF",
      },
    },
  };
  return (
    <div style={Style.container}>
      <h1>{title}</h1>
      <Input
        style={Style.input}
        inputProps={{ "aria-label": "description" }}
        placeholder="Pon tu nombre de usuario..."
        onChange={handleChange}
      />
      <i onClick={handleClick}>
        <Button style={Style.btn} variant="contained">
          Login
        </Button>
      </i>
    </div>
  );
}
