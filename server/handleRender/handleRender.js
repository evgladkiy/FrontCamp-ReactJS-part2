import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';

import App from './../../src/app/app';
import { configureStore, stateToJs } from './../../src/app/store';
import routes from './../../src/app/routes';

function getFullHtml(html, preloadedState) {
    return `
        <!doctype html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <title>FrontCampper React App</title>
                    <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet">
                    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
                    <link rel="stylesheet" href="./styles.css">
                </head>
                <body>
                    <div id="root">${html}</div>
                    <script>
                        window.preloadedState = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                    </script>
                    <script src="bundle.js"></script>
                </body>
            </html>`;
}

function handleRender(req, res) {
    const store = configureStore({});
    const currentBranch = matchRoutes(routes, req.url);
    const promises = currentBranch.map(({ route, match }) => {
        const { fetchData } = route.component;

        if (!(fetchData instanceof Function)) {
            return Promise.resolve(null);
        }

        return fetchData(store.dispatch, req.user, match);
    });

    return Promise.all(promises)
        .then(() => {
            const context = {};
            const app = (
                <Provider store={store}>
                    <StaticRouter location={req.url} contex={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            );
            const html = ReactDOMServer.renderToString(app);
            const preloadState = stateToJs(store.getState());

            if (context.url) {
                return res.redirect(context.url);
            }
            return res.send(getFullHtml(html, preloadState));
        });
}

export default handleRender;
