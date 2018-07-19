import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import * as L from "leaflet";
import {inject, observer} from 'mobx-react';

@inject('BuildingStore')
@observer
export default class OpenStreetMap extends Component {
    constructor(props){
        super(props);
        this.BuildingStore = this.props.BuildingStore;

        this.state = {
            lat: 51.05389,
            lng: 3.705,
            zoom: 11
        }
    }

    /**
     * On mounting of the component we ask for location permission
     * and place the coordinates (if allowed) in the state
     */
    componentWillMount(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 16
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
        {this.BuildingStore.getFilteredBuildings.map((building) => {

            var markerIcon = L.divIcon({className: 'map__marker', html: '' +
                '<img src="'+ require("../images/map-marker-icon.png") +'" class="map__marker__image"/>' +
                '<span class="map__marker__text">'+building.title+'</span>'});

            buldingPosition.push(<Marker className="pointer"  position={[building.location.lat, building.location.long]}
                                         icon={markerIcon} onClick={this.onClick}></Marker>);}
        )}
        return buldingPosition;
    };

    onClick = (e) =>{
        let building;
        this.BuildingStore.getBuildings.forEach(element => {
            if(element.location.lat === e.latlng.lat && element.location.long === e.latlng.lng){
                building = element;
            }
        });
        this.BuildingStore.setBuilding(building);
        this.BuildingStore.setIsInDetailState(true);
    }

    render() {
        return (
            <Map center={[this.state.lat,this.state.lng]} zoom={this.state.zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.showMarkers()}
            </Map>
        )
    }
}