import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

import 'foundation-sites/dist/css/foundation.min.css';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Routes />, document.getElementById('root'));
  registerServiceWorker();
});
