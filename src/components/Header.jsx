import React, {Component} from 'react'
import {Col, Input, Row, Modal, Button} from "react-materialize";
import {SearchFilterContainer} from "./SearchFilterContainer";
import {inject, observer} from 'mobx-react';

@inject('BuildingStore')
@observer
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.BuildingStore = this.props.BuildingStore;
        this.handleSearchRequest = this.handleSearchRequest.bind(this);
        this.UID = 0; // To surpress warnings in React render Array --> Each element in an array needs a unique key value
    }

    handleSearchRequest = (e) => {
        this.BuildingStore.setIsInDetailState(false);
        this.BuildingStore.setSearchKey(e.target.value);
    }

    /**
     * Update the slider value inside the modal
     */
    displaySliderValue = () => {
        let sliderValue = document.getElementById("wheelslider").value;
        document.getElementById("search__filters__filter__caption__breedte-rolstoel").innerHTML = "Breedte rolstoel: " + sliderValue + "cm";
        this.BuildingStore.setIsInDetailState(false);
        this.BuildingStore.setFilters({wheelchairWidth: sliderValue});
    }

    //range filter
    wheelchairWidthFilter =
        <div className="search__filters__range" action="#">
            <p className="range-field">
                <input type="range" id="wheelslider" min="50" max="150" onChange={this.displaySliderValue}/>
            </p>
        </div>;

    typeOfBuildingFilter =
        <Row>
            <Input name='group1' type='checkbox' value='restaurant' label='Restaurant'/>
            <Input name='group1' type='checkbox' value='bar' label='Cafe'/>
            <Input name='group1' type='checkbox' value='shop' label='Winkelen'/>
            <Input name='group1' type='checkbox' value='school' label='School'/>
            <Input name='group1' type='checkbox' value='hospital' label='Ziekenhuis'/>
        </Row>;

    facilitiesFilter =
        <Row>
            <Input name='group2' type='checkbox' value='red' label='Lift'/>
            <Input name='group2' type='checkbox' value='yellow' label='Ringleiding'/>
        </Row>;

    /**
     * This array determines which filters are rendered, and consists of the name (shown in the header) and the component which is shown in the modal
     *
     * @type {*[]}
     */
    filters = [
        {name: 'Breedte rolstoel', content: this.wheelchairWidthFilter}
    ];


    filterReferences = [];

    /**
     * Helper function which determines if the references to all filter components have been saved yet
     *
     * @returns {boolean}
     */
    allRefsCollected = () => {
        return Object.keys(this.filterReferences).length >= this.filters.length;
    }

    /**
     * Helper function which stores references to all child filter components
     *
     * @returns {boolean}
     */
    refCollector = (id) => {
        var that = this;
        return function (element) {
            that.filterReferences[id] = element;

            if (that.allRefsCollected()) {
                // do some work with all refs
            }
        }
    };

    /**
     * Executed before a filter modal is opened, used to close all other modals
     */
    onOpenFilterModal = () => {
        for (var i = 0, len = this.filterReferences.length; i < len; i++) {
            this.filterReferences[i].closeModal();
        }
    };

    /**
     * Render the filter components
     *
     * @returns {any[]}
     */
    renderFilters() {
        return this.filters.map((filter, index) => {
            return <SearchFilterContainer name={filter.name} content={filter.content} onOpen={this.onOpenFilterModal}
                                          ref={this.refCollector(index)} key={++this.UID}/>;
        });
    }


    resetSearch = (e) => {
        document.getElementById('search').value = "";
        this.BuildingStore.setSearchKey(document.getElementById('search').value);
    }

    resetFilters = (e) => {
        this.renderFilters();
    }


    render() {
        return (
            <nav className="header">
                <Row>
                    <Col l={3} m={6} href="#">
                        <div className="brand">
                            <img className="brand__icon" src={require('../images/logo-oasis.svg')}
                                 alt="OASIS"></img>
                            <h1 className="brand__name">Access Flanders</h1>
                        </div>
                    </Col>
                    <Modal
                        header='Als jij rolstoelgebruiker bent'
                        trigger={<Button className="button">DEMO</Button>}>
                        <p>
                            vul alstublieft de breedte van uw rolstoel in.</p><p> We toon enkel bereikbare locaties voor jou op de kaart.</p>
                    </Modal>
                    <Col s={1} className="right">
                        <a href="https://github.com/oSoc18/OASIS" target="_blank">
                            <img alt="github icon" title="github" className="social__media__icon"
                                 src={require('../images/logo-github.svg')}>
                            </img>
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col s={4} className="search">
                        <div className="input-field">
                            <input id="search" type="search" placeholder="Zoek op naam" required
                                   onInput={this.handleSearchRequest}></input>
                            <label className="label-icon" htmlFor="search">
                                <i className="material-icons">search</i>
                            </label>
                            <i className="material-icons" onClick={this.resetSearch}>close</i>
                        </div>
                    </Col>
                    <Col s={8}>
                        <div className="search__filters">
                            {this.renderFilters()}
                            <label>
                                <i className="material-icons">search</i>
                            </label>
                            <Button className="resetFiltersButton" onClick={this.resetFilters}>close</Button>
                        </div>
                    </Col>
                </Row>
            </nav>
        )
    }
}
