import React, { useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { AppContext } from '../App';
import { MaterialIconMenu } from '../MaterialIconMenu';
import { useHistory } from 'react-router-dom';
import { Search, Cancel } from '@material-ui/icons';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        justifyContent: 'space-between',
    },
    phoneMenu:{
        width:'100%',
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tabletMenu:{
        width:'100%',
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pcMenu:{
        width:'100%',
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuButton: {
        display: 'inline-block',
        marginLeft: theme.spacing(2),
    },
    darkMode: {
        flexGrow: 0.5,
    },
    searchbar: {
        margin: '15px',
        borderRadius: '10px',
        backgroundColor: 'white'
    },
    title: {
        display:'inline',
        flexGrow: 1,
        margin: '0px 10px'
    },
  }),
);

export const MaterialTopBar = () => {
    const classes = useStyles();
    const [darkMode, setDarkMode] = React.useState(false);
    const [searching, setSearching] = React.useState(false);
    const { title, authData, screenQuery } = useContext(AppContext);
    const history = useHistory();

    const handleDarkModeChange = (bool:boolean) => {
        setDarkMode(bool);
        alert('Dark mode not impleneted.')
    }

    const navMenuItems = [ //TODO: Get  routes from context.  Should be the same as sidebar menu
        {label:'Home', clickHandler:() => console.log(`...clicked menu item "Home"`)},
        {label:'Another section', clickHandler:() => console.log(`...clicked menu item "Another section"`)},
        {label:'Another section', clickHandler:() => console.log(`...clicked menu item "Another section"`)},
        {label:'Another section', clickHandler:() => console.log(`...clicked menu item "Another section"`)},
        {label:'Another section', clickHandler:() => console.log(`...clicked menu item "Another section"`)},
        {label:'Dark Mode', clickHandler:() => handleDarkModeChange(true)},
        {label:'Light Mode', clickHandler:() => handleDarkModeChange(false)},
    ];
    const userMenuItems = [
        {label:'Profile', clickHandler:() => console.log(`...clicked menu item "Profile"`)},
        {label:'My Account', clickHandler:() => console.log(`...clicked menu item "My Account"`)},
    ];

    useEffect(() => {
        if (authData.tokenExpiration <= 0) {  //TODO: Uncomment this before pushing to production
          history.push('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authData.tokenExpiration]);

    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            
            {(screenQuery === 'phone') && (
                <div className={classes.phoneMenu}>
                    {searching 
                    ? (
                        <TextField id="search" label="Search" variant="filled"  className={classes.searchbar} />
                    ):(
                        <Typography variant="h6" className={classes.title}>
                            {title}
                        </Typography>
                    )}
                    {searching
                    ? (
                        <Cancel onClick={() => setSearching(false)} />
                    ):( 
                        <Search onClick={() => setSearching(true)} />
                    )}
                    <MenuButton menuItems={navMenuItems} classes={classes} />
                </div>
            )}

            {(screenQuery === 'tablet') && (
                <div className={classes.tabletMenu}>
                    <MenuButton menuItems={navMenuItems} classes={classes} />
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <UserAvatarMenu 
                        menuItems={userMenuItems} 
                        classes={classes} />
                </div>
            )}

            {(screenQuery === 'pc') && (
                <div className={classes.pcMenu}>
                    <MenuButton menuItems={navMenuItems} classes={classes} />
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <FormGroup className={classes.darkMode}>
                        <FormControlLabel
                            control={<Switch 
                                checked={darkMode} 
                                onChange={e => handleDarkModeChange(e.target.checked)} 
                                aria-label="dark mode switch" />}
                            label='Dark Mode'
                        />
                    </FormGroup>
                    <UserAvatarMenu 
                        menuItems={userMenuItems} 
                        classes={classes} />
                </div>
            )}               

        </Toolbar>
      </AppBar>
    </div>
  );
}

const MenuButton:React.FC<{
    menuItems: {label:string,clickHandler:() => void}[];
    classes: Record<any,string>;
}> = props => {

    return (
        <MaterialIconMenu
            id='menu-button' 
            classes={props.classes.menuButton} 
            icon={<MenuIcon />} 
            edge='end' 
            menuItems={props.menuItems}
        />
    );
}

const UserAvatarMenu:React.FC<{
    menuItems: {label:string,clickHandler:() => void}[];
    classes: Record<any,string>;
}> = props => {

    // TODO: Set user avatar based on authData.tokenExpiration
    return (true 
            ? (
                <MaterialIconMenu
                    id='user-avatar' 
                    icon={<AccountCircle />} 
                    edge='end' 
                    menuItems={props.menuItems}
                    />
            ):(
                null
            )
    );
}
