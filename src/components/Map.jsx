import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import * as L from "leaflet";
import {inject, observer} from 'mobx-react';

require('../css/Map.css');
    
@inject('BuildingStore')
@observer
export default class OpenStreetMap extends Component {
    state = {
        lat: 51.05389,
        lng: 3.705,
        zoom: 2,
    }

    constructor(props){
        super(props);
        this.BuildingStore = this.props.BuildingStore;
    }

    /**
     * show marker showing one array one at the time
     * @param markerIcon this in informotion on the marker icon
     * @returns {Array} this return the position of the building
     */
     showMarkers = (markerIcon) => {
        let buldingPosition = [];
         {this.BuildingStore.getBuildings.map((building) => {
             buldingPosition.push(<Marker className="pointer"  position={[building.location.lat, building.location.long]}
                                          icon={markerIcon} onClick={this.onClick} >
                 <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup></Marker>);
            //return <Marker className="pointer"  position={[building.location.lat, building.location.long]} icon={myIcon}/>
        })}
        return buldingPosition;
    };

    onClick = (e) =>{
        let b;
        // console.log(e);
        this.BuildingStore.getBuildings.forEach(element => {
            if(element.location.lat === e.latlng.lat && element.location.long === e.latlng.lng){
                b = element;
            }
        });
        this.props.onClick(b.id);
    }

    render() {
        var markerIcon = L.icon({
            iconUrl: require("../images/map-marker-icon.png"),
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [-3 -76]
        });

        return (
            <Map center={[51.05389,3.705]} zoom={this.state.zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.showMarkers(markerIcon)}
            </Map>
        )
    }
}