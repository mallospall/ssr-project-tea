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
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous" />
        <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: `window.initState=${JSON.stringify(initState)}` }} />
        {/* Было раньше - <script defer>window.initState={{{initState}}}</script> */}
        <script defer src="/app.js" />
        <script defer src="/vendor.js" />
        <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=<6eb8bf8f-1394-4692-b41f-0561df9b2c80>" type="text/javascript"/>
        <script src="icon_customImage.js" type="text/javascript"/>
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
