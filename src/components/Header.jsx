import React, {Component} from 'react'
import {Input, Row} from "react-materialize";
import {SearchFilterContainer} from "./SearchFilterContainer";

require('../css/Header.css');

export default class Header extends Component {

    filters = [
        {name: 'Wheelchair width', content: <span>Filter details</span>},
        {name:  'Wheelchair height', content:  <span>Filter details</span>},
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
        for (var i = 0, len = this.filterReferences.length ; i < len; i++) {
            this.filterReferences[i].closeModal();
        }
    };

    renderFilters() {
        return this.filters.map((filter, index) => {
            return <SearchFilterContainer name={filter.name} content={filter.content} onOpen={this.onOpenFilterModal}
                                          ref={this.refCollector(index)}/>;
        });
    }

    render(props) {
        return (
            <nav className="header">
                <div className="search__bar">

                    <a href="#" className="brand">
                        <img className="brand__icon" src={require('../images/logo-oasis.svg')} alt="OASIS"></img>
                        <h1 className="brand__name">OASIS</h1>
                    </a>
                    <form className="search">
                        <div className="input-field">
                            <input id="search" type="search" required></input>
                            <label className="label-icon" htmlFor="search">
                                <i className="material-icons">search</i>
                            </label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
                <div className="search__filters">
                    <Row>
                        <Input s={3} type='select' defaultValue='2' className="search__filters__filter">
                            <option value='1'>Option 1</option>
                            <option value='2'>Option 2</option>
                            <option value='3'>Option 3</option>
                        </Input>

                        <Input s={3} type='select' defaultValue='2' className="search__filters__filter">
                            <option value='1'>Option 1</option>
                            <option value='2'>Option 2</option>
                            <option value='3'>Option 3</option>
                        </Input>

                        {this.renderFilters()}
                    </Row>
                </div>

            </nav>


        )
    }
}