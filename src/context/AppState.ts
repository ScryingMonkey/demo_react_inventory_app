import { Product } from "../types/Product";
import { AppFuncs } from "./AppFuncs";

export type AppState = {
  title: string;
  state: {
    topbarIcon: "" | "back" | "cancel" | "plus";
    topBarClickHandler: () => void | null;
  };
  products: Product[];
  f: AppFuncs | null;
};
export const appState: AppState = {
  title: "SBR Takehome Project",
  state: {
    topbarIcon: "",
    topBarClickHandler: null
  },
  products: [],
  f: null
};
export type MyDispatch = React.Dispatch<React.SetStateAction<AppState>>;
