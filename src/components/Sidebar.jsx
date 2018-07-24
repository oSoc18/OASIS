import React from 'react'
import SearchResult from "./SidebarSearchResult.jsx";
import {Card, Col, Pagination} from "react-materialize";
import BuildingDetail from './SidebarBuildingDetail.jsx';
import {inject, observer} from 'mobx-react';


@inject('BuildingStore')
@observer
export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.BuildingStore = this.props.BuildingStore;
        this.UID = 0; // To surpress warnings in React render Array --> Each element in an array needs a unique key value
    }

    renderLists = () => {
        let result = [];
        for (let i = 0; i < this.BuildingStore.getFilteredBuildings.length; i++) {
            result.push(<SearchResult buildings={this.BuildingStore.getFilteredBuildings[i]} key={++this.UID}/>);
        }
        return result;
    };


    renderDetails = () => {
        let details = [];
        details.push(<BuildingDetail buildings={this.BuildingStore.getBuilding}  key={++this.UID}/>);
        return details;
    };

    show = () => {
        if (!this.BuildingStore.getIsInDetailState) {
            return this.renderLists();
        } else {
            return this.renderDetails();
        }
    }

    render() {
        let searchTitle = (this.BuildingStore.getSearchKey === "")
            ? this.BuildingStore.getFilteredBuildings.length + " results "
            : "Results for '" + this.BuildingStore.getSearchKey + "' (" + this.renderLists().length + ")";
        return (

            <Col l={4} m={6} s={12}>
                <div className="sidebar">
                    {this.show()}
                </div>
                <div className="result">
                    <h4 className="result__text">{searchTitle}</h4>
                </div>
            </Col>

        )
    }
}