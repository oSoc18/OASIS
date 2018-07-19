import React from 'react';
import OpenStreetMap from "./Map.jsx";
import Sidebar from "./Sidebar.jsx";
import {Row} from "react-materialize";
import Header from "./Header.jsx";
import {inject, observer} from 'mobx-react';
import * as ldfetch from '../ldfetch/lib/ldfetch';
import Building from './Building.jsx';

require('../css/App.css');

// const buildings = [
//     {id: 1, title:"BeCentral", src:"http://placekitten.com/200/300", about:"Information about becentral", location: {lat: 51.05389, long:3.705}},
//     {id: 2, title:"City Hall", src:"http://placekitten.com/200/200", about:"Awesome city hall place", location: {lat: 51, long:4}},
//     {id: 3, title:"Public Service", src:"http://placekitten.com/200/300", about:"Some public service building", location: {lat: 51, long:2}},
//     {id: 4, title:"Building Name", src:"http://placekitten.com/200/200", about:"Info", location: {lat: 50, long:5}}
// ];

const buildings = [];

const StartURL = 'http://smartflanders.ilabt.imec.be/graph/master-catalog.json';
const fetch = new ldfetch();

@inject('BuildingStore')
@observer
export default class App extends React.Component {
    constructor(props){
        super(props);
        
        try {
            this.getLinkedOpenData();
        } catch (e) {
            console.error(e);
        }
    }

    triplesToObjects = function(triples) {
        var objects = {};
        for (var index in triples) {
            var triple = triples[index];
            if (!objects[triple.subject.value]) {
                objects[triple.subject.value] = {};
            }
            objects[triple.subject.value][triple.predicate.value] = triple.object.value;
        }
        return objects;
    };
    
    callGebouw = async function (url) {
        try{
            let response = await fetch.get(url);
            let objects = this.triplesToObjects(response.triples);

            for(let subject in objects){
                let entity = objects[subject];
                if(entity["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] === "http://data.vlaanderen.be/ns/gebouw#Gebouw"){
                    let descr = entity["http://purl.org/dc/terms/description"];
                    let location = {lat:0, long: 0};
                    let title = "Gebouw";
                    let src = "http://placekitten.com/200/300";
                    let adres = entity["http://data.vlaanderen.be/ns/gebouw#Gebouw.adres"]; // not relevant for user
                    location.lat = objects[objects[adres]["http://www.w3.org/2003/01/geo/wgs84_pos#location"]]["http://www.w3.org/2003/01/geo/wgs84_pos#lat"];
                    location.long =  objects[objects[adres]["http://www.w3.org/2003/01/geo/wgs84_pos#location"]]["http://www.w3.org/2003/01/geo/wgs84_pos#long"];

                    let comp = <Building id={subject} title={title} src={src} about={descr} lat={parseFloat(location.lat)} long={parseFloat(location.long)} />
                    buildings.push(comp);
                }
            }
        }catch(e){
            return;
        }
    }
    
    callChild = async function (url) {
        try{
            let response = await fetch.get(url);
            let triples = response.triples;
            let objects = this.triplesToObjects(triples);
            for(let subject in objects){
                let entity = objects[subject];            
                if(entity["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] === "https://www.w3.org/ns/dcat#Dataset"){
                    if(entity["https://www.w3.org/ns/dcat#keyword"] === "http://data.vlaanderen.be/ns/gebouw#Gebouw"){
                        let dist = entity["https://www.w3.org/ns/dcat#distribution"];
                        let url = objects[dist]["https://www.w3.org/ns/dcat#accessUrl"];
                        await this.callGebouw(url);
                    }
                }
            }
        }catch(e){
            return;
        }
    }
        
    getLinkedOpenData = async function () {
        let response = await fetch.get(StartURL);
        let triples = response.triples;
        for(let index in triples){
            if(triples[index].predicate.value === "http://xmlns.com/foaf/0.1/page"){
                let url = triples[index].object.value;
                await this.callChild(url);
            }
        }
        
        const {BuildingStore} = this.props;
        BuildingStore.addBuildings(buildings);
    }

    render() {
        return (
            <div className={"application"}>
                <Header className={"application__header"}/>
                <Row className={"application__content"}>
                    <Sidebar />
                    <OpenStreetMap />
                </Row> 
            </div>);
    }
}
