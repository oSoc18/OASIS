import React from 'react'
import {Card, Col, Row, Preloader} from "react-materialize";
import {inject, observer} from 'mobx-react';
import OpenStreetMap from "./Map";


@inject('BuildingStore')
@inject('OpenStreetMap')
@observer
export default class SidebarSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.BuildingStore = this.props.BuildingStore;
        this.Building = this.props.buildings.props;
    }

    handleClick(e) {
        e.preventDefault();
        let id = this.Building.id;
        let building = this.BuildingStore.getBuildings.find(b => b.props.id === id);

        this.BuildingStore.setBuilding(building);
        this.BuildingStore.setIsInDetailState(true);
    }

    showAccessibilityInformation = () => {
        try {
            let ar = [];
            let accessInfo = this.Building.accessInfo;
            for (let index in accessInfo) {
                if(accessInfo[index].description === "The entrance"){
                    ar.push(
                        <div key={++this.UID}>
                            <p>
                                <i className="material-icons">arrow_back</i><i className="material-icons">arrow_forward</i> <span className="entranceWidth">{accessInfo[index].width} cm </span>
                            </p>
                        </div>)
                }
            }
            return ar;
        } catch (e) {
            return (<div><p>Er is geen toegankelijkheidsinformatie beschikbaar voor dit gebouw</p></div>);
        }
    }

    linkOrdescription = () => {
        if (this.Building.description !== "Geen beschrijving beschikbaar") {
            return <a href={this.Building.description}>{this.Building.description}</a>;
        }
        return <p>{this.Building.description}</p>;
    }

    buildingInZone = () =>{
        /*let bigLat =this.building.props.lat > (this.OpenStreetMap.state.lat - this.OpenStreetMap.zoomlatlng[this.OpenStreetMap.state.zoom][0]);
        let smallLat =this.building.props.lat < (this.OpenStreetMap.state.lat + this.OpenStreetMap.zoomlatlng[this.OpenStreetMap.state.zoom][0]);
        let bigLng =this.building.props.lat > (this.OpenStreetMap.state.lat - this.OpenStreetMap.zoomlatlng[this.OpenStreetMap.state.zoom][1]);
        let smallLng =this.building.props.lat > (this.OpenStreetMap.state.lat + this.OpenStreetMap.zoomlatlng[this.OpenStreetMap.state.zoom][1]);
            if(bigLat && smallLat && bigLng && smallLng){*/
                return (<div>
                <Row>
                    <Col m={12} s={12}>

                        <h4 className="building__name">{this.Building.title.replace(/[&\/\\#,+()$~%.'":;*?<>{}1234567890]/g, '')}</h4>
                    </Col>


                    <Col m={9} s={12}>
                        <span className="sidebar__searchresult__description">{this.linkOrdescription()}</span>
                    </Col>
                    <img className="col m3 s12 sidebar__searchresult__thumbnail" src={this.Building.src}/>
                    <Col m={9} s={12}>
                        {this.showAccessibilityInformation()}
                    </Col>
                    <a className="col m12 s12 center" href="#" onClick={this.handleClick} id={this.Building.id}>Meer
                        details...</a>
                </Row>
                <hr/>
            </div>
            );/*}*/
    }


    render() {
        return (
            <div className="buildings__card">
            {this.buildingInZone()}
                </div>)
    }
}