import { Product } from "../types/Product";
import { AppFuncs } from "./AppFuncs";
import { AuthData } from "../types/_index";

export type AppState = {
  title: string;
  authData: AuthData;
  state: {
    topbarIcon: "" | "back" | "cancel" | "plus";
    topBarClickHandler: () => void | null;
  };
  products: Product[];
  f: AppFuncs | null;
};
export const appState: AppState = {
  title: "SBR Takehome Project",
  authData: {
    userId: "",
    token: "",
    tokenExpiration: 0
  },
  state: {
    topbarIcon: "",
    topBarClickHandler: () => alert("Menu would go here.")
  },
  products: [],
  f: null
};
export type MyDispatch = React.Dispatch<React.SetStateAction<AppState>>;
