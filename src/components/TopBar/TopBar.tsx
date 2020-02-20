import React, { useContext } from "react";
import "./TopBar.css";
import { AppContext } from "../App";
import { Hamburger } from "../Hamburger/Hamburger";
import { SearchBar } from "../SearchBar/SearchBar";

export const TopBar = () => {
  const { title, f, state } = useContext(AppContext);

  return (
    <div className="TopBar">
      <header>{title}</header>
      <div className="searchbar">
        {/* <SearchBar
          value={state.seachBarValue}
          changeFunc={f.searchBarChangeFunc}
        /> */}
      </div>
      <Hamburger
        icon={state.topbarIcon}
        click={() => state.topBarClickHandler()}
      />
    </div>
  );
};
