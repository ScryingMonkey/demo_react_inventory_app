import React from 'react';
import { Paper } from '@material-ui/core';

const divStyles = {
    height: '100%'
}

export const SideBar:React.FC<{

}> = props => {

return (
    <Paper>
        <div className='SideBar' style={divStyles}>
            This is where a sidebar would be in a more complex application.
        </div>
    </Paper>
);
}