import React from 'react';
import PropTypes from 'prop-types';

export default class Building extends React.Component {
    constructor(props){super(props);}
}

Building.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    about: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    // doorWidth: PropTypes.number
}