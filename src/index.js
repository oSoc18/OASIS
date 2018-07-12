import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

require('./css/vendor/leaflet.1.3.1.css');
require('./css/vendor/materialize.min.css');
require('./css/vendor/material-icons.css');
//require('./js/jquery-2.1.1.min.js');
//require('./js/materialize.js');

const buildings = [
    {id: 1, title:"BeCentral", src:"http://placekitten.com/200/300", about:"Information about becentral", location: {lat: 51.05389, long:3.705}},
    {id: 2, title:"City Hall", src:"http://placekitten.com/200/200", about:"Awesome city hall place", location: {lat: 51, long:4}},
    {id: 3, title:"Public Service", src:"http://placekitten.com/200/300", about:"Some public service building", location: {lat: 51, long:2}},
    {id: 4, title:"Building Name", src:"http://placekitten.com/200/200", about:"Info", location: {lat: 50, long:5}}
];

ReactDOM.render(<App buildingArr={buildings} />, document.getElementById('root'));
registerServiceWorker();
