import React from 'react';
import PropTypes from 'prop-types';

export default class Building extends React.Component {
    constructor(props){super(props);}
}

Building.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    door: PropTypes.object
}
