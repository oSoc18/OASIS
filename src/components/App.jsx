import React from 'react';
import OpenStreetMap from "./Map.jsx";
import Sidebar from "./Sidebar.jsx";
import {Row} from "react-materialize";
import Header from "./Header.jsx";

require('../css/App.css');

let renderedView = []; // IDs that are visible
export default class App extends React.Component {
    constructor(props){
        super(props);

        this.sidebar = React.createRef();
        this.state = {
            buildingDetail: 1
        }

        {this.init()};
    }

    onRender(){
        {this.showList(renderedView)}
    }

    init=()=>{
        renderedView = [];
        for(let i = 0; i < this.props.buildingArr.length; i++){
            renderedView.push(this.props.buildingArr[i].id)
        }
    }

    showDetail = (newId) => {
        this.setState({
            buildingDetail: newId
        })
        
        this.sidebar.current.setStateToDetails(newId);
    }

    showList = (idArr) => {
        this.sidebar.current.setStateToList(idArr);
    }

    render() {
        return (
            <div className={"application"}>
                <Header className={"application__header"}/>
                <Row className={"application__content"}>
                    <Sidebar buildings={this.props.buildingArr} onClick={this.showDetail} detail={this.state.buildingDetail}
                    ref={this.sidebar}/>
                    <OpenStreetMap buildings={this.props.buildingArr} onClick={this.showDetail}/>
                </Row>
            </div>);
    }
}
