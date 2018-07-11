import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

/** This is just for rendering, edit App.jsx instead! **/

const buildings = [
    {id: 1, title:"BeCentral", src:"http://placekitten.com/200/300", about:"Information about becentral", location: {long: 51.05389, lat:3.705}},
    {id: 2, title:"City Hall", src:"http://placekitten.com/200/200", about:"Awesome city hall place", location: {long: 51, lat:4}},
    {id: 3, title:"Public Service", src:"http://placekitten.com/200/300", about:"Some public service building", location: {long: 51, lat:2}},
    {id: 4, title:"Building Name", src:"http://placekitten.com/200/200", about:"Info", location: {long: 50, lat:5}}
];

ReactDOM.render(<App buildingArr={buildings}/>, document.getElementById('root'));