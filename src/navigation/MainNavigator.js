import React from 'react';
import routesPath from "../values/routesPath";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from '../pages/home/Home';


const MainNavigator = () =>
{
    return (
        <BrowserRouter>
            <Switch>
                <React.Suspense fallback={<p>Loading ...</p>}>
                    <Route path={`${routesPath.Home.list}`} exact render={(props) => <Home {...props} />} />
                </React.Suspense>
            </Switch>
        </BrowserRouter>
    );
}

export default MainNavigator;