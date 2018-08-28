import React from 'react';
import OpenStreetMap from "./Map.jsx";
import Sidebar from "./Sidebar.jsx";
import {Row} from "react-materialize";
import Header from "./Header.jsx";
import {inject, observer} from 'mobx-react';
import * as ldfetch from '../ldfetch/lib/ldfetch';
import Building from './Building.jsx';

require('../css/App.scss');

const buildings = [];

const StartURL = 'https://smartflanders.ilabt.imec.be/graph/master-catalog.json';
const fetch = new ldfetch();


@inject('BuildingStore')
@observer
export default class App extends React.Component {
    constructor(props) {
        super(props);

        try {
            this.getLinkedOpenData();
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Retrieve an array everything we know about a certain subject
     *
     * @param triples list of triples
     * @return array summary of everything we know about a certain subject in one object
     **/
    triplesToArray = function (triples) {
        var objects = {};
        for (var index in triples) {
            var triple = triples[index];
            if (!objects[triple.subject.value]) {
                objects[triple.subject.value] = {};
            }
            if (!objects[triple.subject.value][triple.predicate.value]) {
                objects[triple.subject.value][triple.predicate.value] = [];
            }
            objects[triple.subject.value][triple.predicate.value].push(triple.object.value);
        }
        return objects;
    }

    /**
     * It takes the list of triples as an argument, and returns a summary of everything we know about a certain subject in one object
     */
    triplesToObjects = function (triples) {
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

    getBuilding = function (id) {
        let building = null;
        for (let b  in buildings) {
            if (buildings[b].props.id === id) {
                building = buildings[b];
            }
        }
        return building;
    }

    getBuildingIndex = function (id) {
        let index = null;
        for (let b  in buildings) {
            if (buildings[b].props.id === id) {
                index = b;
            }
        }
        return index;
    }

    doesBuildingExist = function (id) {
        return (this.getBuilding(id) !== null);
    }

    /**
     * Get information of a public services based on the url
     */
    getPublicServiceData = async function (url) {
        try {
            let response = await fetch.get(url);
            let objects = this.triplesToObjects(response.triples);

            for (let subject in objects) {
                let entity = objects[subject];
                if (entity["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] === "http://purl.org/vocab/cpsv#PublicService") {
                    let idBuildingAdres = entity["http://www.w3.org/ns/locn#location"];
                    let name = entity["http://schema.org/name"];
                    let desc = entity["http://schema.org/description"];

                    let accessInfo = objects[objects[entity["toevla:accessibilityMeasurement"]]["toevla:accessibilityMeasurement_for"]]; // not relevant for user
                    let accessObj = {description: "", width: 0};
                    accessObj.description = accessInfo["dcterms:description"];
                    accessObj.width = accessInfo["toevla:elevatorDoorWidth"];

                    let serviceObj = {
                        "name": name,
                        "desc": desc,
                        "accessinfo": accessObj
                    }

                    let component;
                    if (this.doesBuildingExist(idBuildingAdres)) {
                        let b = this.getBuilding(idBuildingAdres);
                        let index = this.getBuildingIndex(idBuildingAdres);
                        let serviceArr = b.props.service;
                        serviceArr.push(serviceObj);
                        component = <Building id={idBuildingAdres} title={b.props.title} src={b.props.src}
                                                  description={b.props.description}
                                                  lat={b.props.lat} long={b.props.long} service={serviceArr}/>;

                        buildings[index] = component;
                    } else {
                        component = <Building id={idBuildingAdres} title={"Publieke Service"}
                                                  description={"Niet gelinkt aan een gekend gebouw"} lat={0} long={0}
                                                  service={[serviceObj]}/>;
                        buildings.push(component);
                    }

                    const {BuildingStore} = this.props;
                    BuildingStore.addBuilding(component);
                }
            }
        } catch (e) {
            return;
        }
    }

    getWebsite(entity) {
        let web = entity["http://schema.org/WebSite"];
        if (typeof(web) === 'undefined') {
            return "Geen website beschikbaar";
        }
        return web;
    }

    getLocation(objects, entity) {
        try {
            let location = {lat: 0, long: 0};
            let adres = entity["http://data.vlaanderen.be/ns/gebouw#Gebouw.adres"]; // not relevant for user
            location.lat = objects[objects[adres]["http://www.w3.org/2003/01/geo/wgs84_pos#location"]]["http://www.w3.org/2003/01/geo/wgs84_pos#lat"];
            location.long = objects[objects[adres]["http://www.w3.org/2003/01/geo/wgs84_pos#location"]]["http://www.w3.org/2003/01/geo/wgs84_pos#long"];
            return location;
        } catch (e) {
            return {lat: 0, long: 0};
        }
    }

    getAccessibilityInformation(entity) {

    }

    /**
     * Get information of a building based on the url and push it to the building array
     */
    getBuildingInformation = async function (url) {
        try {
            let response = await fetch.get(url);
            let objects = this.triplesToArray(response.triples);
            let title = "";

            for (let subject in objects) {
                let entity = objects[subject];
                // console.log(entity["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"][0]);
                if (entity["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] && entity["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"][0] === "http://data.vlaanderen.be/ns/gebouw#Gebouw") {
                                //console.log(subject)

                    let idBuildingAdres = entity["http://data.vlaanderen.be/ns/gebouw#Gebouw.adres"][0];
                    let web = this.getWebsite(entity);
                    let location = this.getLocation(objects, entity);
                    try{
                        title = entity["http://schema.org/name"][0];
                    }catch(e){
                        title = "Gebouw"; // Change to 'Name not available maybe ?
                        web = subject; // subject page as website
                    }
                    let src = entity["http://schema.org/image"];

                    // Accessibility stuff
                    let accessInfo = [];
                    try{
                    let accessInfoLocations = objects[entity["http://semweb.mmlab.be/ns/wa#accessibilityMeasurement"]]["http://semweb.mmlab.be/ns/wa#accessibilityMeasurement_for"];
                    for (let index in accessInfoLocations) {
                        let obj = {description: "", width: 0};
                        // Get the string of the width (can be either ElevatorDoorWidth or entranceDoorWidth or ...)
                        let key = Object.keys(objects[accessInfoLocations[index]])[1];

                        obj.description = objects[accessInfoLocations[index]]["http://purl.org/dc/terms/description"][0];
                        obj.width = objects[accessInfoLocations[index]][key][0];
                        accessInfo.push(obj);
                    }}
                    catch(e){
                        // Currently do nothing 
                    }

                    let component;
                    if (this.doesBuildingExist(idBuildingAdres)) {
                        let b = this.getBuilding(idBuildingAdres);
                        let index = this.getBuildingIndex(idBuildingAdres);
                        component = <Building id={idBuildingAdres} title={title} src={src} description={web}
                                                  lat={parseFloat(location.lat)} long={parseFloat(location.long)}
                                                  accessInfo={accessInfo} service={b.props.service}/>;
                        buildings[index] = component;
                    } else {
                        component = <Building id={idBuildingAdres} title={title} src={src} description={web}
                                                  lat={parseFloat(location.lat)} long={parseFloat(location.long)}
                                                  accessInfo={accessInfo}/>;
                        buildings.push(component);
                    }

                    const {BuildingStore} = this.props;
                    BuildingStore.addBuilding(component);
                }
            }
        } catch (e) {
            // console.log(e);
            return;
        }
    }

    /**
     * Get the Dataset urls from the master catalog and search for buildings
     */
    getDataSets = async function (url) {
        try {
            let response = await fetch.get(url);
            let triples = response.triples;
            let objects = this.triplesToObjects(triples);
            for (let subject in objects) {
                let entity = objects[subject];
                if (entity["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] === "https://www.w3.org/ns/dcat#Dataset") {
                    if (entity["https://www.w3.org/ns/dcat#keyword"] === "http://data.vlaanderen.be/ns/gebouw#Gebouw") {
                        let dist = entity["https://www.w3.org/ns/dcat#distribution"];
                        let url = objects[dist]["https://www.w3.org/ns/dcat#accessUrl"];
                        url = url.replace('http', 'https');
                        await this.getBuildingInformation(url);
                    }
                   /** if (entity["https://www.w3.org/ns/dcat#keyword"] === "http://purl.org/vocab/cpsv#PublicService") {
                        let dist = entity["https://www.w3.org/ns/dcat#distribution"];
                        let url = objects[dist]["https://www.w3.org/ns/dcat#accessUrl"];
                        url = url.replace('http', 'https');
                        await this.getPublicServiceData(url);
                    } **/
                }
            }
        } catch (e) {
            return;
        }
    }

    /**
     * Get the linked open data from the master catalog using the url above
     */
    getLinkedOpenData = async function () {
        let response = await fetch.get(StartURL);
        let triples = response.triples;
        for (let index in triples) {
            if (triples[index].predicate.value === "http://xmlns.com/foaf/0.1/page") {
                let url = triples[index].object.value;
                url = url.replace('http', 'https');
                await this.getDataSets(url);
            }
        }

        const {BuildingStore} = this.props;
        /** BuildingStore.addBuildings(buildings); **/
    }

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
