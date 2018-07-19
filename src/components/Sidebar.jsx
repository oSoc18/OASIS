import React from 'react'
import SearchResult from "./SidebarSearchResult.jsx";
import {Card, Col} from "react-materialize";
import BuildingDetail from './SidebarBuildingDetail.jsx';
import {inject, observer} from 'mobx-react';

    
@inject('BuildingStore')
@observer
export default class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.BuildingStore = this.props.BuildingStore;
    }

    renderLists = () => {
        let result = [];
        for(let i = 0; i < this.BuildingStore.getFilteredBuildings.length; i++){
            result.push(<SearchResult buildings={this.BuildingStore.getFilteredBuildings[i]} />);
        }
        return  result;
    };


    renderDetails = () => {
        let details = [];
        details.push(<BuildingDetail buildings={this.BuildingStore.getBuilding}/>);
        return details;
    };

    show = () => {
        if(!this.BuildingStore.getIsInDetailState){
            return this.renderLists();
        }else{
            return this.renderDetails();
        }
    }

    render() {
        let searchTitle = (this.BuildingStore.getSearchKey==="")
         ? "Results (" + this.BuildingStore.getBuildings.length + ")"
         : "Results for '" + this.BuildingStore.getSearchKey +"' ("+this.renderLists().length+")";
        return (
            <Col m={3} s={12} className="sidebar">
                
                <Card className='sidebar__card white darken-1' title={searchTitle} actions={[<a href='#'>This is a link</a>]}>
                    {this.show()}
                </Card>
            </Col>
        )
    }
}