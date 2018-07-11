import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

require('../css/Map.css');

export default class OpenStreetMap extends Component {
    state = {
        lat: 51.05389,
        lng: 3.705,
        zoom: 11,
    }

    constructor(props){
        super(props);
    }

    /**
     * show marker showing one array one at the time
     * @param markerIcon this in informotion on the marker icon
     * @returns {Array} this return the position of the building
     */
     showMarkers = (markerIcon) => {
        let buldingPosition = [];
         {this.props.buildings.map((building) => {
             buldingPosition.push(<Marker className="pointer"  position={[building.location.long, building.location.lat]}
                                          icon={markerIcon} onMouseOver={this.test}>
                 <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup></Marker>);
            //return <Marker className="pointer"  position={[building.location.lat, building.location.long]} icon={myIcon}/>
        })}
        return buldingPosition;
    };

test = () =>{
    alert('test');
}

    render() {
        var markerIcon = L.icon({
            iconUrl: "/src/images/map-marker-icon.png",
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
                <p >i am here</p>
                {this.showMarkers(markerIcon)}

            </Map>
        )
    }
}