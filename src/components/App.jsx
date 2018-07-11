import React from 'react';
import OpenStreetMap from "./Map.jsx";
import Sidebar from "./Sidebar.jsx";
import {Row} from "react-materialize";
import Header from "./Header.jsx";

require('../css/App.css');

export default class App extends React.Component {
    render() {
        return (
            <div className={"application"}>
                <Header className={"application__header"}/>
                <Row className={"application__content"}>
                    <Sidebar buildings={this.props.buildingArr}/>
                    <OpenStreetMap buildings={this.props.buildingArr}/>
                </Row>
            </div>);
    }
}
