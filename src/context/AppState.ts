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
  
  screenQuery: "pc" | "tablet"|"phone" | null;
  f: AppFuncs | null;
};

const getScreenQuery = ():'pc'|'tablet'|'phone' => {
  console.log(`> getScreenQuery()`);
  const screenSize = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  console.log(`...screenSize:${screenSize}`);
  if(screenSize >= 1050){ 
    return 'pc';
  } else if (screenSize > 360 && screenSize < 1050){ 
    return 'tablet';
  } else { 
    return 'phone';
  }
}

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
  screenQuery: getScreenQuery(),
  f: null
};
export type MyDispatch = React.Dispatch<React.SetStateAction<AppState>>;
