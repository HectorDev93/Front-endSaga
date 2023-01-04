import React from 'react';
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import E404 from '../../components/common/error/E404';
class OtherRoute extends React.Component
{
    render()
    {
        return (
            <Switch>
             <Route path="*" component={E404}/> 
            </Switch>
        )
    }
}

export default OtherRoute;