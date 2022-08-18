import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

function Layout({ initState }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/icon-48x48.png" />
        <link rel="stylesheet" href="/stylesheets/normalize.css" />
        <link rel="stylesheet" href="/stylesheets/application.css" />
        <script dangerouslySetInnerHTML={{ __html: `window.initState=${JSON.stringify(initState)}` }} />
        {/* Было раньше - <script defer>window.initState={{{initState}}}</script> */}
        <script defer src="/app.js" />
        <script defer src="/vendor.js" />
        <script defer src="https://api-maps.yandex.ru/2.1/?apikey=6eb8bf8f-1394-4692-b41f-0561df9b2c80&lang=ru_RU" type="text/javascript" />
        <title>Document</title>
      </head>
      <body>
        <div id="root">
          <StaticRouter location={initState.path}>
            <App {...initState} />
          </StaticRouter>
        </div>
      </body>
    </html>
  );
}

export default Layout;
