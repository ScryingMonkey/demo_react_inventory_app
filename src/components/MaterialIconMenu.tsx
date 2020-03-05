import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';

const divStyles = {
    display: 'inline-block'
}

export const MaterialIconMenu:React.FC<{
    id:string;
    icon:JSX.Element;
    ariaLabel?:string;
    classes?: string;
    edge?:false | "start" | "end";
    menuItems: {label:string, clickHandler:()=>void}[];
}> = props => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
    setAnchorEl(null);
    };

    return (
        <div className="MaterialIconMenu" style={divStyles} >
            <IconButton
                edge={props.edge} 
                aria-label={props.ariaLabel}
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
            {props.icon}
            </IconButton>
            <Menu
                id={props.id}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
            {props.menuItems.map((mi,i) => (
                <MenuItem key={`menu-item-${i}`} 
                    onClick={() => {mi.clickHandler(); return handleClose();}} >
                        {mi.label}
                    </MenuItem>
            ))}
            </Menu>
        </div>
    );
}
