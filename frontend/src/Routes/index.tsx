import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/home';
import Create from '../pages/cadastrar';
import Alterar from '../pages/alterar';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cadastrar" component={Create} />
        <Route path="/alterar/:id+" component={Alterar} />
    </Switch>
)

export default Routes;