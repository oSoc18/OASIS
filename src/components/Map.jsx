import React, {Component} from 'react'
import {Map, Marker, TileLayer} from 'react-leaflet'
import * as L from "leaflet";
import {inject, observer} from 'mobx-react';

@inject('BuildingStore')
@observer
export default class OpenStreetMap extends Component {
    constructor(props) {
        super(props);
        this.BuildingStore = this.props.BuildingStore;
        this.UID = 0; // To surpress warnings in React render Array --> Each element in an array needs a unique key value
        this.state = this.BuildingStore.state;
        this.zoomlatlng = this.BuildingStore.zoomlatlng;
    }

    /**
     * On mounting of the component we ask for location permission
     * and place the coordinates (if allowed) in the state
     */
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    zoom: 10
                });
            });
    }

    /**
     * show marker showing one array one at the time
     *
     * @returns {Array} this return the position of the building
     */
    showMarkers = () => {
        let buldingPosition = [];
        {
            this.BuildingStore.getFilteredBuildings.map((building) => {

                var markerIcon = L.divIcon({
                    className: 'map__marker', html: '' +
                    '<img src="' + require("../images/map-marker-icon.png") + '" class="map__marker__image"/>' +
                    '<span class="map__marker__text">' + building.props.title + '</span>'
                });
                buldingPosition.push(<Marker className="pointer" position={[building.props.lat, building.props.long]}
                                             icon={markerIcon} onClick={this.onClick} key={++this.UID}/>);
            })
        }

        return buldingPosition;
    };

    onClick = (e) => {
        let building = this.BuildingStore.getBuildings.find(b => b.props.lat === e.latlng.lat && b.props.long === e.latlng.lng);
        this.BuildingStore.setBuilding(building);
        this.BuildingStore.setIsInDetailState(false);
        this.BuildingStore.setIsInDetailState(true);
    }

    handleMoveend = (event) => {
        let map = event.map;
        
        this.setState({
                    lat: event.target._animateToCenter.lat,
                    lng: event.target._animateToCenter.lng,
                    zoom: event.target._animateToZoom
                });
        this.BuildingStore.boundsMap = event.target.getBounds();
        this.BuildingStore.state = this.state;
    }

    render() {
        return (
                <Map className={"col m6 l8 hide-on-small-only"} center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} onMoveend={this.handleMoveend}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> bijdragers"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.showMarkers()}
                </Map>
        )
    }
}