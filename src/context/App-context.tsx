import { createContext } from "react";

type ContextProps = object;

const appContext = createContext<ContextProps>({});

export default appContext;
