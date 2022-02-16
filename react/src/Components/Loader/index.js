import PropTypes from 'prop-types';
import React from 'react';  
import {Spinner } from 'react-bootstrap';
const Loader = ({color = 'primary'}) => {
    return (
        <div className="pageSpinner">
            <Spinner color={'primary'}  animation="border"/>
        </div>
    );
};

Loader.propTypes = {
    color: PropTypes.oneOf([
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
    ]),
};

export default Loader;
