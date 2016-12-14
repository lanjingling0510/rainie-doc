import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import routes from 'app/routes';
import Ui from 'app/ui';

const root = document.getElementById('canvas');

routes.start((routeData) => {
  ReactDOM.render(<Ui routeData={routeData}/>, root);
});
