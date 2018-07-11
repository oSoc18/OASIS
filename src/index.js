import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

/** This is just for rendering, edit App.jsx instead! **/

const buildings = [
    {title:"BeCentral", src:"http://placekitten.com/200/300", about:"Information about becentral", location: {long: 51, lat:51}},
    {title:"City Hall", src:"http://placekitten.com/200/200", about:"Awesome city hall place", location: {long: 31, lat:31}},
    {title:"Public Service", src:"http://placekitten.com/200/300", about:"Some public service building", location: {long: 51, lat:41}},
    {title:"Building Name", src:"http://placekitten.com/200/200", about:"Info", location: {long: 40, lat:51}}
];

ReactDOM.render(<App buildingArr={buildings}/>, document.getElementById('root'));