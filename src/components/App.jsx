import React from 'react';
import OpenStreetMap from "./Map.jsx";
import Sidebar from "./Sidebar.jsx";
import {Row} from "react-materialize";
import Header from "./Header.jsx";
import {inject, observer} from 'mobx-react';
import * as ldfetch from '../ldfetch/lib/ldfetch';

require('../css/App.css');

const buildings = [
    {id: 1, title:"BeCentral", src:"http://placekitten.com/200/300", about:"Information about becentral", location: {lat: 51.05389, long:3.705}},
    {id: 2, title:"City Hall", src:"http://placekitten.com/200/200", about:"Awesome city hall place", location: {lat: 51, long:4}},
    {id: 3, title:"Public Service", src:"http://placekitten.com/200/300", about:"Some public service building", location: {lat: 51, long:2}},
    {id: 4, title:"Building Name", src:"http://placekitten.com/200/200", about:"Info", location: {lat: 50, long:5}}
];

const url = 'http://smartflanders.ilabt.imec.be/graph/master-catalog.json';

var fetch = new ldfetch();
var getLinkedOpenData = async function () {
    var response = await fetch.get(url);
    console.log(response.triples);
}
try {
    getLinkedOpenData();
} catch (e) {
    console.error(e);
}

@inject('BuildingStore')
@observer
export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buildingDetail: 1
        }
    }
    
   
        
    render() {
        const {BuildingStore} = this.props;
        BuildingStore.addBuildings(buildings);
        return (
            <div className={"application"}>
                <Header className={"application__header"}/>
                <Row className={"application__content"}>
                    <Sidebar detail={this.state.buildingDetail} ref={this.sidebar} />
                    <OpenStreetMap />
                </Row> 
            </div>);
    }
}
