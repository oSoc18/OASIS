import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'mobx-react';
import store from './stores/BuildingStore';
require('./css/vendor/leaflet.1.3.1.css');
require('./css/vendor/materialize.min.css');
require('./css/vendor/material-icons.css');
//require('./js/jquery-2.1.1.min.js');
//require('./js/materialize.js');

const Root = (
    <Provider BuildingStore = {store}> 
        <App/>
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
