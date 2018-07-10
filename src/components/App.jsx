import React from 'react';
import OpenStreetMap from "./Map.jsx";
import Sidebar from "./Sidebar.jsx";
import {Row} from "react-materialize";
import Header from "./Header.jsx";

require('../css/leaflet.1.3.1.css');
require('../css/materialize.min.css');
require('../css/material-icons.css');
require('../css/App.css');
require('../js/materialize.min.js');

export default class App extends React.Component {
    render() {
        return (
            <div className={"application"}>
                <Header className={"application__header"}/>
                <Row className={"application__content"}>
                    <Sidebar/>
                    <OpenStreetMap/>
                </Row>
            </div>);
    }
}
