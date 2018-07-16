import React from 'react';
import OpenStreetMap from "./Map.jsx";
import Sidebar from "./Sidebar.jsx";
import {Row} from "react-materialize";
import Header from "./Header.jsx";
import {inject, observer} from 'mobx-react';

require('../css/App.css');


let renderedView = []; // IDs that are visible

const buildings = [
    {id: 1, title:"BeCentral", src:"http://placekitten.com/200/300", about:"Information about becentral", location: {lat: 51.05389, long:3.705}},
    {id: 2, title:"City Hall", src:"http://placekitten.com/200/200", about:"Awesome city hall place", location: {lat: 51, long:4}},
    {id: 3, title:"Public Service", src:"http://placekitten.com/200/300", about:"Some public service building", location: {lat: 51, long:2}},
    {id: 4, title:"Building Name", src:"http://placekitten.com/200/200", about:"Info", location: {lat: 50, long:5}}
];

@inject('BuildingStore')
@observer
export default class App extends React.Component {
    constructor(props){
        super(props);
        //this.sidebar = React.createRef();
        this.state = {
            buildingDetail: 1
        }

       // {this.init()};
    }

    // onRender(){
    //     {this.showList(renderedView)}
    // }

    // init=()=>{
    //     renderedView = [];
    //     for(let i = 0; i < example.length; i++){
    //         renderedView.push(example[i].id)
    //     }
    // }

    // showDetail = (newId) => {
    //     this.setState({
    //         buildingDetail: newId
    //     })
        
    //     this.sidebar.current.setStateToDetails(newId);
    // }

    // showList = (idArr) => {
    //     this.sidebar.current.setStateToList(idArr);
    // }
    
    render() {
        const {BuildingStore} = this.props;
        BuildingStore.addBuildings(buildings);
        console.log(this.props);
        return (
            <div className={"application"}>
                <Header className={"application__header"}/>
                <Row className={"application__content"}>
                    {/* <Sidebar buildings={example.buildings} onClick={this.showDetail} detail={this.state.buildingDetail}
                    ref={this.sidebar}
                    />
                    <OpenStreetMap buildings={example.buildings} onClick={this.showDetail}/>*/}
                </Row> 
            </div>);
    }
}
