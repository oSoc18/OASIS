import React, {Component} from 'react'

require('../css/Header.css');

export default class Header extends Component {

    render(props) {
        return (
            <nav className="header navbar">
                <div className="nav-wrapper row">
                    <a href="/" className="header__brand brand-logo" style={{float: 'left'}}>OASIS</a>
                    <div className="col m6 grey-text"style={{float: 'left'}}>
                        <div className="col input-field m9 s9 grey-text">
                            <input id="search" className="grey-text white" value="" type="text"/>
                            <label className="grey-text" htmlFor="search">Zoeken</label>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}