import React, {Component} from 'react'
import {Col, Input, Row} from "react-materialize";
import {SearchFilterContainer} from "./SearchFilterContainer";
import {inject, observer} from 'mobx-react';

@inject('BuildingStore')
@observer
export default class Header extends Component {
    constructor(props){
        super(props);
        this.BuildingStore = this.props.BuildingStore;
        this.handleSearchRequest = this.handleSearchRequest.bind(this);
    }

    handleSearchRequest = (e) =>{
        this.BuildingStore.setIsInDetailState(false);
        this.BuildingStore.setSearchKey(e.target.value);
    }

    displaySliderValue = () => {
        let sliderValue = document.getElementById("wheelslider").value;
        document.getElementById("wheelchair__description").innerHTML = "Wheelchair width :"+sliderValue;
        this.BuildingStore.setIsInDetailState(false);
        this.BuildingStore.setFilters({wheelchairWidth: sliderValue});
    }

    //range filter
    wheelchairWidthFilter =
        <div className="search__filters__range" action="#">
            <p className="wheelchair__description" id="wheelchair__description">Wheelchair width :50</p>
            <p className="range-field">
                <input type="range" id="wheelslider" min="50" max="150" onChange={this.displaySliderValue}/>
            </p>
        </div>;

    //radio botton filter
    selection =
        <Row>
            <Input name='group1' type='radio' value='red' label='Red' />
            <Input name='group1' type='radio' value='yellow' label='Yellow' />
        </Row>;

    //radio botton filter
    typeOfFacility =
        <Row>
            <Input name='group1' type='radio' value='restaurant' label='restaurant' />
            <Input name='group1' type='radio' value='bar' label='bar' />
            <Input name='group1' type='radio' value='shop' label='shop' />
            <Input name='group1' type='radio' value='mall' label='mall' />
            <Input name='group1' type='radio' value='school' label='school' />
            <Input name='group1' type='radio' value='hospital' label='hospital' />
        </Row>;

    //checkboxe filter
    multiple__selection =
        <Row>
            <Input name='group2' type='checkbox' value='red' label='Red' />
            <Input name='group2' type='checkbox' value='yellow' label='Yellow' />
        </Row>;

    filters = [
        {name: 'typeOfFacility', content: this.typeOfFacility},
        {name: 'Wheelchair width', content: this.wheelchairWidthFilter},
        {name: 'Elevator', content: this.selection},
        {name: 'options', content: this.multiple__selection},
    ];


    filterReferences = [];


    allRefsCollected = () => {
        return Object.keys(this.filterReferences).length >= this.filters.length;
    }

    refCollector = (id) => {
        var that = this;
        return function (element) {
            that.filterReferences[id] = element;

            if (that.allRefsCollected()) {
                // do some work with all refs
            }
        }
    };

    onOpenFilterModal = () => {
        for (var i = 0, len = this.filterReferences.length; i < len; i++) {
            this.filterReferences[i].closeModal();
        }
    };

    renderFilters() {
        return this.filters.map((filter, index) => {
            return <SearchFilterContainer name={filter.name} content={filter.content} onOpen={this.onOpenFilterModal}
                                          ref={this.refCollector(index)}/>;
        });
    }


    resetSearch = (e) => {
        document.getElementById('search').value = "";
        this.BuildingStore.setSearchKey(document.getElementById('search').value);
    }

    render() {
        return (
            <nav className="header">
                <Row className="search__bar">
                    <Col s={3} href="#" className="brand">
                        <img className="brand__icon" src={require('../images/logo-oasis.svg')} alt="OASIS"></img>
                        <h1 className="brand__name">OASIS</h1>
                    </Col>
                    <Col s={6} className="search">
                        <div className="input-field">
                            <input id="search" type="search" required onInput={this.handleSearchRequest}></input>
                            <label className="label-icon" htmlFor="search">
                                <i className="material-icons">search</i>
                            </label>
                            <i className="material-icons" onClick={this.resetSearch}>close</i>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <div className="search__filters">
                    <Row className="">
                        <Col s={3}>
                        </Col>
                        <Col s={9}>
                            {this.renderFilters()}
                        </Col>
                    </Row>
                </div>
            </nav>
        )
    }
}
