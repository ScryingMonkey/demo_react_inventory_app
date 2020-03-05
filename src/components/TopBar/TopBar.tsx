import React, { useContext, useEffect } from 'react';
import './TopBar.css';
import { AppContext } from '../App';
import { Hamburger } from '../Hamburger/Hamburger';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Avatar } from '@material-ui/core';

export const TopBar = () => {
  const { title, authData, state, screenQuery } = useContext(AppContext);

  const renderTopBar = (screenQuery) => {
    switch (screenQuery){
      case 'pc':
        return <PcTopBar 
          title={title} 
          isLoggedIn={authData.tokenExpiration > 0} 
          />
      case 'tablet':
        return <PhoneTopBar 
          title={title} 
          isLoggedIn={authData.tokenExpiration > 0} 
          state= {state} 
          />
      case 'phone':
        return <PhoneTopBar 
          title={title} 
          isLoggedIn={authData.tokenExpiration > 0} 
          state= {state} 
          />
      default:
        return <PhoneTopBar 
          title={title} 
          isLoggedIn={authData.tokenExpiration > 0} 
          state= {state} 
          />
    }
  }

  useEffect(() => {
    // if (authData.tokenExpiration <= 0) {  //TODO: Uncomment this before pushing to production
    //   history.push('/login');
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData.tokenExpiration]);

  return renderTopBar(screenQuery);
};

const PcTopBar:React.FC<{
  title:string;
  isLoggedIn: boolean;
}> = props => {

  return (
    <div className="TopBar">
      <header>{props.title}</header>
      <div className="searchbar">
        {/* <SearchBar
          value={state.seachBarValue}
          changeFunc={f.searchBarChangeFunc}
        /> */}
      </div>
      { 
        props.isLoggedIn
          ? <AccountCircleIcon color='action' fontSize='large' />
          : (<div className='avatar'><Avatar>U</Avatar></div>)
      }
    </div>
  );
}

const PhoneTopBar:React.FC<{
  title:string;
  isLoggedIn: boolean;
  state: {
    topbarIcon: "" | "back" | "cancel" | "plus";
    topBarClickHandler: () => void | null;
  };
}> = props => {

  return (
    <div className="TopBar">
      <header>{props.title}</header>
      <div className="searchbar">
        {/* <SearchBar
          value={state.seachBarValue}
          changeFunc={f.searchBarChangeFunc}
        /> */}
        Phone
      </div>
      <Hamburger
        icon={props.state.topbarIcon}
        click={() => props.state.topBarClickHandler()}
      />
    </div>
  );
}