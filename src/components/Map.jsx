import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

require('../css/Map.css');

export default class OpenStreetMap extends Component {
    state = {
        lat: 51.05389,
        lng: 3.705,
        zoom: 11,
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </Map>
        )
    }
}