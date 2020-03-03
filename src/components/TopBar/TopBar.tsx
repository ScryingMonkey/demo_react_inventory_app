import React, { useContext, useEffect } from 'react';
import './TopBar.css';
import { AppContext } from '../App';
import { Hamburger } from '../Hamburger/Hamburger';
import { useHistory } from 'react-router-dom';

export const TopBar = () => {
  const { title, authData, state } = useContext(AppContext);
  let history = useHistory();
  useEffect(() => {
    // if (authData.tokenExpiration <= 0) {  //TODO: Uncomment this before pushing to production
    //   history.push('/login');
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData.tokenExpiration]);

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
