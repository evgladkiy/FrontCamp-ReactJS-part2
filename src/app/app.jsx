import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import 'isomorphic-fetch';

import routes from './routes';

const App = () => (
    <Switch>
        {renderRoutes(routes)}
    </Switch>
);

export default App;
